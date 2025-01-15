using Chat.Chat;
using Chat.Configuration;
using Chat.Database;
using Chat.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

string? allowedUrlsString = builder.Configuration["AllowedUrls"];
string[] allowedUrls =
    allowedUrlsString?.Split(',', StringSplitOptions.RemoveEmptyEntries) ?? Array.Empty<string>();
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowedUrls",
        builder =>
            builder
                .WithOrigins("http://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials()
    );
});
builder.Services.AddSignalR();
builder.Services.AddCors();
builder.Services.Configure<Config>(builder.Configuration);
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);
builder.Services.AddScoped<IMessageRepository, MessageRepository>();

var app = builder.Build();

app.UseCors("AllowedUrls");
app.MapHub<ChatHub>("/chat");

app.Run();
