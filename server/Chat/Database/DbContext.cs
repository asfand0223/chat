using Chat.Models;
using Microsoft.EntityFrameworkCore;

namespace Chat.Database
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Message>? Messages { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }
    }
}
