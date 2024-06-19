var client = new HttpClient();
var request = new HttpRequestMessage();
request.RequestUri = new Uri("http://localhost:3000/api/users");
request.Method = HttpMethod.Get;

request.Headers.Add("Accept", "*/*");
request.Headers.Add("User-Agent", "Thunder Client (https://www.thunderclient.com)");

var bodyString = "{  \"name\": \"Paul\",  \"email\": \"paul@yahoo.com\",  \"password\": \"paulpaul\"}";
var content = new StringContent(bodyString, Encoding.UTF8, "application/json");
request.Content = content;

var response = await client.SendAsync(request);
var result = await response.Content.ReadAsStringAsync();
Console.WriteLine(result);