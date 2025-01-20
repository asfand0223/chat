using Chat.Configuration;
using Chat.SignalR;

var builder = WebApplication.CreateBuilder(args);
string? allowedUrlsString = builder.Configuration.GetValue<string>("AllowedUrls");
string[] allowedUrls =
    allowedUrlsString?.Split(',', StringSplitOptions.RemoveEmptyEntries) ?? Array.Empty<string>();
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowedUrls",
        builder =>
            builder.WithOrigins(allowedUrls).AllowAnyHeader().AllowAnyMethod().AllowCredentials()
    );
});
builder.Services.AddSignalR();
builder.Services.AddCors();
builder.Services.Configure<Config>(builder.Configuration);

var app = builder.Build();

app.UseCors("AllowedUrls");
app.MapHub<ChatHub>("/chat");

app.Run();
