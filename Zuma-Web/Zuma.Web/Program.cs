using Microsoft.EntityFrameworkCore;
using Zuma.Web.DataAccess;
using Zuma.Web.Repositories.Implementation;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<ZumaDBContext>(options =>
{
    string dbProvider = builder.Configuration["DatabaseProvider"];

    string connString = builder.Configuration.GetConnectionString("Default");

    switch (dbProvider)
    {
        case "Sqlite":
            options.UseSqlite(connString);
            break;
        //case "SqlServer":
        //    options.UseSqlServer(connString);
        //    break;
    }
});

builder.Services.AddScoped(typeof(IDataRepository<>), typeof(DataRepository<>));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Results/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Results}/{action=Index}/{id?}");

app.Run();
