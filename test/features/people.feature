@people @regression
Feature: People Service
  In order to manage people
  As a developer
  I want to make sure CRUD operations through REST API works fine

  Scenario Outline: Create a people
    Given A user <request>
    When I send POST request to /people
    Then I get <response>

    Examples: 
      | request                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | response                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
      | {"name":"Luke Skywalker","height":"172","mass":"77","hairColor":"blond","skinColor":"fair","eyeColor":"blue","birthYear":"19BBY","gender":"male","homeWorld":"https://swapi.py4e.com/api/planets/1/","films":["https://swapi.py4e.com/api/films/1/","https://swapi.py4e.com/api/films/2/","https://swapi.py4e.com/api/films/3/","https://swapi.py4e.com/api/films/6/","https://swapi.py4e.com/api/films/7/"],"species":["https://swapi.py4e.com/api/species/1/"],"vehicles":["https://swapi.py4e.com/api/vehicles/14/","https://swapi.py4e.com/api/vehicles/30/"],"starShips":["https://swapi.py4e.com/api/starships/12/","https://swapi.py4e.com/api/starships/22/"],"url":"https://swapi.py4e.com/api/people/1/"} | {"name":"LukeSkywalker","height":"172","mass":"77","hairColor":"blond","skinColor":"fair","eyeColor":"blue","birthYear":"19BBY","gender":"male","homeWorld":"https://swapi.py4e.com/api/planets/1/","films":["https://swapi.py4e.com/api/films/1/","https://swapi.py4e.com/api/films/2/","https://swapi.py4e.com/api/films/3/","https://swapi.py4e.com/api/films/6/","https://swapi.py4e.com/api/films/7/"],"species":["https://swapi.py4e.com/api/species/1/"],"vehicles":["https://swapi.py4e.com/api/vehicles/14/","https://swapi.py4e.com/api/vehicles/30/"],"starShips":["https://swapi.py4e.com/api/starships/12/","https://swapi.py4e.com/api/starships/22/"],"url":"https://swapi.py4e.com/api/people/1/","id":"e58bf64d-5014-42a7-9b4b-3be4280c5895","created":1712732532514,"edited":1712732532514} |
      | {"name":"Anakin Skywalker","route":"/client/orders/list"}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | {"statusCode": 200, "body": {"data": {"id":10,"name":"RIDER","route":"/client/orders/list"}, "message": "Successful operation."}}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

  Scenario Outline: Get All people
    When I send GET request to /people
    Then I get <response>

    Examples: 
      | response                                                                                                                                                                                                                                                  |
      | {"statusCode": 200, "body": {"data": [{"id":1,"name":"RESTAURANT","route":"/restaurant/orders/list"},{"id":2,"name":"RIDER","route":"/rider/orders/list"},{"id":3,"name":"CLIENT","route":"/client/products/list"}], "message": "Successful operation."}} |

  Scenario Outline: Get people
    Given A user with <id> exist
    When I send GET request to /people/
    Then I get <response>

    Examples: 
      | id | response                                                                                                                                                                    |
      |  1 | {"statusCode": 200, "body": {"data": {"id":1,"name":"RIDER","route":"/restaurant/orders/list"}, "message": "Successful operation."}}                                        |
      |  0 | {"statusCode": 404, "body": {"message": "Role not found", "details":"Role not found"}}                                                                                      |
      | X  | {"statusCode": 404, "body": {"message": "Role to be wrong", "details":[{"validation":"regex","code":"invalid_string","message":"It is not a valid number","path":["id"]}]}} |

  Scenario Outline: modify people
    Given A user with <id> exist
    When I send PATCH request with a <request> to /people/
    Then I get <response>

    Examples: 
      | id | request                                                                                                                               | response                                                                                                                                                                                                                                                                                   |
      |  0 | {"route":"/restaurant/orders/list"}                                                                                                   | {"statusCode": 404, "body": {"message": "Role not found", "details":"Role not found"}}                                                                                                                                                                                                     |
      |  1 | {"route":"/rider/orders/list"}                                                                                                        | {"statusCode": 200, "body": {"data": {"id":10,"name":"RIDER","route":"/rider/orders/list"}, "message": "Successful operation."}}                                                                                                                                                           |
      |  2 | {"file":{"fieldname":"image","path":"/Users/giancarlo.almerco/Workspace/Projects/Backend/NodeJS/app-delivery/assets/restaurant.jpg"}} | {"statusCode": 200, "body": {"data": {"id":10,"name":"RIDER","route":"/rider/orders/list","image":"https://firebasestorage.googleapis.com/v0/b/appdelivery-a42ae.appspot.com/o/restaurant.jpg?alt=media&token=0495cbb9-9ce8-4180-887f-0cd59d34cee0"}, "message": "Successful operation."}} |
      | X  | {"route":"/root/users/list"}                                                                                                          | {"statusCode": 404, "body": {"message": "Role to be wrong", "details":[{"validation":"regex","code":"invalid_string","message":"It is not a valid number","path":["id"]}]}}                                                                                                                |

  Scenario Outline: delete people
    Given A user with <id> exist
    When I send DELETE request to /people/
    Then I get <response>

    Examples: 
      | id | response                                                                                                                                                                    |
      |  0 | {"statusCode": 404, "body": {"message": "Role not found", "details":"Role not found"}}                                                                                      |
      |  2 | {"statusCode": 200, "body": {"data": {"id": 2,"name":"ADMIN","route":"/restaurant/orders/list"}, "message": "Successful operation."}}                                       |
      | X  | {"statusCode": 404, "body": {"message": "Role to be wrong", "details":[{"validation":"regex","code":"invalid_string","message":"It is not a valid number","path":["id"]}]}} |
