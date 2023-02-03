#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

#Depending on the operating system of the host machines(s) that will build or run the containers, the image specified in the FROM statement may need to be changed.
#For more information, please see https://aka.ms/containercompat

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["zuma.api/zuma.api.csproj", "zuma.api/"]
RUN dotnet restore "zuma.api/zuma.api.csproj"
COPY . .
WORKDIR "/src/zuma.api"
RUN dotnet build "zuma.api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "zuma.api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "zuma.api.dll"]