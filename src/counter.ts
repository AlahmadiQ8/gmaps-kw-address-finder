export async function setupCounter(long: number, lat: number) {
  // navigator.geolocation.getCurrentPosition(position => {
  //   console.log(position.coords.latitude)
  //   console.log(position.coords.longitude)
  // })
  const res = await fetch('https://kfappsrv.paci.gov.kw/kuwaitfinder/server/api/search/identify?params=JNTH7hVI%2BuLjw8cKOTjVKY989P%2FeozxhItA8DCVJ7YOLnbXzccIfzIG2OLxrsRbIqD5DFyxnNIui0nN8DS0V3WOOZv8GoLe0McXdrHCFGIUKU1sew1wm89l6xk6qwqmTMRIocfAH5IAbtTBBtN7TigaLO0VwT25Ja8bacRF7UpjFRbipqQF5I1oTX5WhaBUIb%2F2em%2FXomb009g8EQrkTc7nSbm%2FrfY%2FS%2B5K8wF7EJRDsZWhOK4YePBctCZhkdgtNGb8BMYwLeWy%2FlGigEBsldD2iRbgIiZ%2F0H686lMMk87z4HmmZbhx3inJNziRjDPKX2jNyE5gig%2FS5dIGTEVYBVKBU%2BWUkqz%2Fvm2JwzgB%2FuxqkeK3gwLHnB9RZyLdOFpr5Yg4ZeExIUtm9Nqt9kSGJ6bisN1PekPC8TsZoAMiE9PQeDW3kUhGyDF3PTttzsUEH9fQQEAOi2MCqxKtbAhXQX1f5E3Qng0OKkf%2BUrM1Cd2ONquBDCpPK7F%2FkxCuzseHXzqbCM01eH02uW%2F4bhQHe1tBYAtnatYFgs76VT%2BeAMzVLVfijeMgab%2FvWcPZ%2Bw75j4%2F6bH6EaqiP5ME0idv4isHiKI4GRl1rOeYH22hqcr%2F6qPiEEBw%2FDGy3e22H0wC%2F3yO0jY80jSD6P1tUfWrDJtnKpkHQSucM4vyHO%2BKMDsDbRjRD77X0V%2BXBmNfkJ2Mpb9gwG4KpOXl0%3D')
  console.log(await res.json())
}
