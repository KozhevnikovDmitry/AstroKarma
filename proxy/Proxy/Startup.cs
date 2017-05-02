using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Principal;
using Microsoft.Owin;
using Owin;
using Proxy;

[assembly: OwinStartup(typeof(Startup))]
namespace Proxy
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.Run(async context =>
            {
                var identity = context.Request.User?.Identity as WindowsIdentity;
                if (identity == null)
                {
                    context.Response.StatusCode = 401;
                    return;
                }

                var username = identity.Name;
                var userId = identity.User?.Value;

                using (var http = new HttpClient())
                {
                    http.BaseAddress = new Uri("http://localhost:3001");
                    http.DefaultRequestHeaders.Add("username", username);
                    http.DefaultRequestHeaders.Add("userId", userId);
                    var uri = new Uri(context.Request.Uri.LocalPath, UriKind.Relative);
                    HttpResponseMessage resp = null;

                    switch (context.Request.Method)
                    {
                        case "GET":
                            {
                                resp = await http.GetAsync(uri);
                                break;
                            }
                        case "POST":
                            {
                                var content = context.Request.Query.Select(p => new KeyValuePair<string, string>(p.Key, p.Value.FirstOrDefault()));
                                resp = await http.PostAsync(uri, new FormUrlEncodedContent(content));
                                break;
                            }
                        case "PUT":
                            {
                                var content = context.Request.Query.Select(p => new KeyValuePair<string, string>(p.Key, p.Value.FirstOrDefault()));
                                resp = await http.PutAsync(uri, new FormUrlEncodedContent(content));
                                break;
                            }
                        case "DELETE":
                            {
                                resp = await http.DeleteAsync(uri);
                                break;
                            }
                    }

                    if (resp != null)
                    {
                        await context.Response.WriteAsync(await resp.Content.ReadAsByteArrayAsync());
                    }
                    else
                    {
                        context.Response.StatusCode = 500;
                        context.Response.Write("Handler not found");
                    }
                }
            });
        }
    }
}