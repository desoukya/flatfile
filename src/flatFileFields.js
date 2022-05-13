module.exports = ({
  ourairports: {
    fields: [
      { key: "id", label: "id" },
      { key: "ident", label: "ident" },
      { key: "type", label: "type" },
      { key: "name", label: "name" },
      { key: "latitudeDeg", label: "latitude_deg" },
      { key: "longitudeDeg", label: "longitude_deg" },
      { key: "elevation", label: "elevation_ft" },
      { key: "continent", label: "continent" },
      { key: "isoCountry", label: "iso_country" },
      { key: "isoRegion", label: "iso_region" },
      { key: "municipality", label: "municipality" },
      { key: "scheduledService", label: "scheduled_service" },
      { key: "gpsCode", label: "gps_code" },
      { key: "localCode", label: "local_code" },
      { key: "homeLink", label: "home_link" },
      { key: "wikipediaLink", label: "wikipedia_link" },
      { key: "keywords", label: "keywords" },
    ],
  },
  cities: {
    fields: [
      { key: "latd", label: "latd" },
      { key: "latm", label: "latm" },
      { key: "lats", label: "lats" },
      { key: "ns", label: "ns" },
      { key: "lond", label: "lond" },
      { key: "lonm", label: "lonm" },
      { key: "lons", label: "lons" },
      { key: "ew", label: "ew" },
      { key: "city", label: "city" },
      { key: "state", label: "state" },
    ],
  }    
});