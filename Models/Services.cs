namespace LeeboysWildlife.Models;

public class Service
{
    public int Id { get; set; }
    public string ServiceName { get; set; }
    public int ServiceTypeId { get; set; }

    public List <ServiceType> ServiceTypes { get; set; }
}