using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using LeeboysWildlife.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;

namespace LeeboysWildlife.Data;
public class LeeboysWildlifeDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;
   
    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<Client> Clients { get; set; }
    public DbSet <Employee> Employees { get; set; }
    public DbSet <Service> Services { get; set; }
    public DbSet <ServiceType> ServiceTypes { get; set; }
    public DbSet <WorkOrder> WorkOrders { get; set; }

    public LeeboysWildlifeDbContext(DbContextOptions<LeeboysWildlifeDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser
        {
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            UserName = "Leeboy",
            Email = "leeboyswildliferemoval@gmail.com",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        });

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
        });
        modelBuilder.Entity<UserProfile>().HasData(new UserProfile
        {
            Id = 1,
            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            FirstName = "Mike",
            LastName = "Lee",
            Address = "Western Wisconsin",
        });

       
        modelBuilder.Entity<Employee>().HasData(new Employee[]
        {
            new Employee
            {
                Id = 1,
                Name = "Mike Lee",
                Address = "224 LJ Est.",
                Email = "ml@email.com",
                Telephone = "146-456-789",
                Active = true,
                Pay = 21.50M

                
            },
            new Employee
            {
                Id = 2,
                Name = "Steve Lee",
                Address = "446 Evelyn Lane",
                Email = "SLee@email.com",
                Telephone = "351-654-987",
                Pay = 19.50M
                
                
            
            },
            new Employee
            {
                Id = 3,
                Name = "Dan Lee",
                Address = "580 Forrest St",
                Email = "dlee@email.com",
                Telephone = "351-894-987",
                Active = true,
                Pay = 19.50M
                
                
            }
        });
        modelBuilder.Entity<Client>().HasData(new Client[]
        {
            new Client
            {
                Id = 1,
                Name = "Megan Lee",
                Address = "224 LJ Est.",
                Email = "mlee@email.com",
                Telephone = "123-456-789",
                Active = true

                
            },
            new Client
            {
                Id = 2,
                Name = "John James",
                Address = "3081 County Rd. D.",
                Email = "jjames@email.com",
                Telephone = "321-654-987",
                Active = true
                
                
            }
        });
        modelBuilder.Entity<Service>().HasData(new Service[]
        {
            new Service
            {
                Id = 1,
                ServiceTypeId = 1,
                Name = "Full Home Exclusion",
                Description = "A full home exclusion service by a wildlife removal company encompasses inspection, humane wildlife removal, structural repairs, and sanitation. It aims to prevent future intrusions by sealing entry points and providing homeowners with guidance on wildlife prevention. This comprehensive approach ensures the safety, cleanliness, and long-term protection of the property from unwanted wildlife."
                
            },
            new Service
            {
                Id = 2,
                ServiceTypeId = 1,
                Name = "Partial Home Exclusion",
                Description = "A partial home exclusion service provided by a wildlife removal company focuses on addressing specific areas or entry points where wildlife is gaining access to a property. It involves identifying and sealing these vulnerable points, along with the removal of any wildlife currently present. Unlike a full home exclusion, it's a more targeted approach, typically addressing particular areas of concern rather than the entire property."
                
                
                
            },
            new Service
            {
                Id = 3,
                ServiceTypeId = 2,
                Name = "Wildlife Removal",
                Description = "Wildlife removal is a service offered by specialized companies to safely and humanely remove unwanted animals from a property. This process typically includes identifying the type of wildlife, employing appropriate trapping or removal methods, and releasing the animals back into their natural habitat or relocating them as required. The primary goal of wildlife removal is to eliminate the immediate animal intrusion without necessarily addressing preventative measures or property repairs, as done in full or partial home exclusion services."
                
                
                
            }
        });
        modelBuilder.Entity<ServiceType>().HasData(new ServiceType[]
        {
            new ServiceType
            {
                Id = 1,
                Category = "Exclusion"
                
            },
            new ServiceType
            {
                Id = 2,
                Category = "Trapping"
                
                
            }
        });
        modelBuilder.Entity<WorkOrder>().HasData(new WorkOrder[]
        {
            new WorkOrder
            {
                Id = 1,
                EmployeeId = 1,
                UserProfileId = 1,
                ServiceId = 2,
                Description = "Bats in the attic",
                Emergency = true,
                DateCreated = new DateTime(2023, 7, 15)
            },
            new WorkOrder
            {
                Id = 2,
                EmployeeId = 3,
                UserProfileId = 2,
                ServiceId = 1,
                Description = "Sealing up HVAC Unit",
                Emergency = false,
                DateCreated = new DateTime(2023, 7, 12),
                DateCompleted = new DateTime(2023, 7, 15),
                
            }
        });
    }

    internal object Include(Func<object, object> value)
    {
        throw new NotImplementedException();
    }
}


// trapping and exclusion

// exclusion- full home and partial home

// trapping - 