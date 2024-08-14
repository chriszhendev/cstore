using Microsoft.EntityFrameworkCore;

namespace cstore.Server.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions options) : base(options)
        {
        }
    }
}