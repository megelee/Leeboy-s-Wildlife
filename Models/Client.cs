
namespace LeeboysWildlife.Models;
public class Client
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public string Email { get; set; }
    public string Telephone { get; set; }
    public int UserProfileId { get; set; }
    public bool Active { get; set; }

    public List <UserProfile> UserProfiles { get; set; }
}
