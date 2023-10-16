namespace LeeboysWildlife.Models;

public class ServiceType
{
    public int Id { get; set; }
    public string Category { get; set; }
    public int ServiceId { get; set; }

    public List <Service> Services { get; set; }
}