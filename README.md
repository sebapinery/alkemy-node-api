# Instalacion

1 - Clonar e instalar 

` npm i `

2 - Configurar conexion a la base de datos en archivo config.js

```
database: {
        username: 'test',
        password: 'test',
        database: 'alkemy-node-api',
        host: 'localhost'
    }
}
 ```
 3 - Ejecutar
 
  ` node seed.js ` para cargar los datos de ejemplo en nuestra base de datos
 
 4 - Iniciar servidor
 
 ` npm start `
 
 

# Rutas

## Autenticacion de usuarios
-------------
#### Registro de usuario 

Method:** POST**
> /api/users/register 

Body Request

``` 
{
	"username": "test",
	"password": "test"
}
 
```

Response
```
{
  "newUser": {
    "id": 2,
    "username": "test-user",
    "password": "$2a$10$iCklbIlKrkSM3arc4PyyiOrsehg4uoUNdI7zB90EVM/wmS/9.CcXO",
    "updatedAt": "2021-04-19T20:14:16.914Z",
    "createdAt": "2021-04-19T20:14:16.914Z"
  },
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3QtdXNlciIsImNyZWF0ZWRBdCI6MTYxODg2MzI1NiwiZXhwaXJlZEF0IjoxNjE4ODY2ODU2fQ.WFflk1DKQyczI6k6RvkOSA_fbekpolld9ybaTX6pADw"
}

```
Incluir el token en los headers de las consultas como "user-token" y el token como valor. El token tiene una valiadez de una hora.


#### Login de usuario 

Method:** POST**
> /api/users/login

Body Request
```
{
	"username": "test-user",
	"password": "test-password"
}

```
Response
```
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3QtdXNlciIsImNyZWF0ZWRBdCI6MTYxODg2NDAxMCwiZXhwaXJlZEF0IjoxNjE4ODY3NjEwfQ.NRLQn-e6k8NmMixBgFvptY98sxlau5JNkJJlOFJ2rZE"
}

```
Incluir el token en los headers de las consultas como "user-token" y el token como valor. El token tiene una valiadez de una hora.



## Personajes

#### Listado de Personajes
Method: **GET**

> /api/characters

Response
```
[
  {
    "name": "Timon",
    "image": "./images/characters/timon.jpg"
  },
  {
    "name": "Pumba",
    "image": "./images/characters/pumba.jpg"
  },
  {
    "name": "Aladin",
    "image": "./images/characters/aladin.jpg"
  },
  {
    "name": "Princesa Jasmin",
    "image": "./images/characters/princesa_jazmin.jpg"
  },
  {
    "name": "La bella",
    "image": "./images/characters/la_bella.jpg"
  },
  {
    "name": "La Bestia",
    "image": "./images/characters/la_bestia.jpg"
  },
  {
    "name": "Mickey Mouse",
    "image": "./images/characters/mickey.jpg"
  },
  {
    "name": "Pluto",
    "image": "./images/characters/pluto.jpg"
  }
]

```

Agregando el parametro **details** con el valor **all** podremos acceder al listado completo de personajes con todos los detalles.

> /api/characters?details=all

Response
```
[
  {
    "id": 1,
    "name": "Timon",
    "weight": 12,
    "image": "./images/characters/timon.jpg",
    "age": 4,
    "history": " Una suricata",
    "createdAt": "2021-04-19T20:13:55.000Z",
    "updatedAt": "2021-04-19T20:13:55.000Z",
    "Movies": [
      {
        "title": "Timon y Pumba",
        "character_movie": {
          "CharacterId": 1,
          "MovieId": 1
        }
      }
    ]
  },
  {
    "id": 2,
    "name": "Pumba",
    "weight": 240,
    "image": "./images/characters/pumba.jpg",
    "age": 5,
    "history": " un chancho salvaje",
    "createdAt": "2021-04-19T20:13:55.000Z",
    "updatedAt": "2021-04-19T20:13:55.000Z",
    "Movies": [
      {
        "title": "Timon y Pumba",
        "character_movie": {
          "CharacterId": 2,
          "MovieId": 1
        }
      }
    ]
  },
  ...
  ]

```



#### Detalle de Personaje 

Method: GET

>/api/characters/:id

Reemplazar ":id" por el id del personaje que queremos obtener

Response
```

{
  "id": 1,
  "name": "Timon",
  "weight": 12,
  "image": "./images/characters/timon.jpg",
  "age": 4,
  "history": " Una suricata",
  "createdAt": "2021-04-19T20:13:55.000Z",
  "updatedAt": "2021-04-19T20:13:55.000Z",
  "Movies": [
    {
      "title": "Timon y Pumba",
      "character_movie": {
        "CharacterId": 1,
        "MovieId": 1
      }
    }
  ]
}

```
#### Crear personaje
 Method: **POST**
 
 Body reques
 ```
{
	"name": "Abu",
	"image": "/images/abu,jpg",
	"weight": 6,
	"age": 4,
	"history": "Un mono curioso que se hace amigo de Aladin",
	"MoviesId": [2] 
}

```
Response
```
{
  "id": 9,
  "name": "Abu",
  "weight": 6,
  "image": "images/abu.jpg",
  "age": 4,
  "history": "Un mono curioso",
  "createdAt": "2021-04-19T20:54:09.000Z",
  "updatedAt": "2021-04-19T20:54:09.000Z",
  "Movies": [
    {
      "title": "Aladin",
      "character_movie": {
        "CharacterId": 9,
        "MovieId": 2
      }
    }
  ]
}


```
Propiedad "MoviesId"
- El valor de la propiedad "MoviesId" tiene que ser un array que contenga las peliculas en las que participo el nuevo personaje.
- En caso de no ingresar la propiedad "MoviesId" el personaje no sera asignado a ninguna pelicula
- En caso de ingresar el id de una pelicula que no existe recibira el siguiente mensaje
```
{
  "error": "One or more movies entered does not exist, the character was not created."
}
```

#### Relacionar personaje con pelicula
 Method: **POST**

> /api/characters/addToMovie

 Body request - Introducimos el **id** del personaje que queremos relacionar con el **id** de la pelicula.
 ```
{
	"characterId": 1,
	"movieId": 5
}

```
Response - Obtenemos el personaje con el detalle completo.
 ```
{
  "id": 1,
  "name": "Timon",
  "weight": 12,
  "image": "./images/characters/timon.jpg",
  "age": 4,
  "history": " Una suricata",
  "createdAt": "2021-04-19T20:53:33.000Z",
  "updatedAt": "2021-04-19T20:53:33.000Z",
  "Movies": [
    {
      "title": "Timon y Pumba",
      "character_movie": {
        "CharacterId": 1,
        "MovieId": 1
      }
    },
    {
      "title": "Las aventuras de Mickey y Pluto 2",
      "character_movie": {
        "CharacterId": 1,
        "MovieId": 5
      }
    }
  ]
}

```



#### Eliminar personaje
 Method: **DELETE**
 
 > api/characters/:id

Reemplazar ":id" por el id del personaje que queremos eliminar

Response
```
{
  "msg": "Character id: 9 was deleted successfully"
}
```

#### Modificar personaje
 Method: **PATCH**
 
  > api/characters/:id
  
Reemplazar ":id" por el id del personaje que queremos modificar  

Body request - ingresamos el campo a modificar
```
{
  "weight": 26
}
```  
Response - Obtenemos el detalle del personaje actualizado
```
{
  {
  "id": 1,
  "name": "Aladin",
  "weight": 26,
  "image": "https://i.pinimg.com/originals/ef/ff/07/efff0743a66fbc13f1a5d0c5dd49384c.png",
  "age": 4,
  "history": "Suricata salvaje",
  "createdAt": "2021-04-14T23:25:14.000Z",
  "updatedAt": "2021-04-15T01:03:01.000Z"
}
}

```

#### Búsqueda de Personajes

Method: **GET**

> /api/characters/search/**:terminodebusqueda**?weight=&age=&movieId=

Reemplazar ":terminodebusqueda" por el nombre del personaje que queremos buscar.
Podemos filtrar los resultados por medio de querys params (**age**,** weight** y **movieId**)

Response
```
[
    {
        "id": 1,
        "name": "Timon",
        "weight": 12,
        "image": "./images/characters/timon.jpg",
        "age": 4,
        "history": " Una suricata",
        "createdAt": "2021-04-19T20:53:33.000Z",
        "updatedAt": "2021-04-19T20:53:33.000Z",
        "Movies": [
            {
                "title": "Timon y Pumba",
                "id": 1,
                "character_movie": {
                    "CharacterId": 1,
                    "MovieId": 1
                }
            }
        ]
    },
    {
        "id": 2,
        "name": "Pumba",
        "weight": 240,
        "image": "./images/characters/pumba.jpg",
        "age": 5,
        "history": " un chancho salvaje",
        "createdAt": "2021-04-19T20:53:33.000Z",
        "updatedAt": "2021-04-19T20:53:33.000Z",
        "Movies": [
            {
                "title": "Timon y Pumba",
                "id": 1,
                "character_movie": {
                    "CharacterId": 2,
                    "MovieId": 1
                }
            }
        ]
    },
    {
        "id": 4,
        "name": "Princesa Jasmin",
        "weight": 50,
        "image": "./images/characters/princesa_jazmin.jpg",
        "age": 15,
        "history": "Un princesa de medio oriente",
        "createdAt": "2021-04-19T20:53:33.000Z",
        "updatedAt": "2021-04-19T20:53:33.000Z",
        "Movies": [
            {
                "title": "Aladin",
                "id": 2,
                "character_movie": {
                    "CharacterId": 4,
                    "MovieId": 2
                }
            }
        ]
    },
    {
        "id": 7,
        "name": "Mickey Mouse",
        "weight": 45,
        "image": "./images/characters/mickey.jpg",
        "age": 12,
        "history": "El famoso ratoncito de Walt Disney",
        "createdAt": "2021-04-19T20:53:33.000Z",
        "updatedAt": "2021-04-19T20:53:33.000Z",
        "Movies": [
            {
                "title": "Las aventuras de Mickey y Pluto",
                "id": 4,
                "character_movie": {
                    "CharacterId": 7,
                    "MovieId": 4
                }
            },
            {
                "title": "Las aventuras de Mickey y Pluto 2",
                "id": 5,
                "character_movie": {
                    "CharacterId": 7,
                    "MovieId": 5
                }
            }
        ]
    }
]
```

## Peliculas

#### Listado de Peliculas
Method: **GET**

> /api/movies

Response

```
[
    {
        "title": "Timon y Pumba",
        "image": "./images/movies/timon_y_pumba.jpg",
        "releaseDate": "1995-02-03T00:00:00.000Z"
    },
    {
        "title": "Aladin",
        "image": "./images/movies/aladin.jpg",
        "releaseDate": "1999-02-03T00:00:00.000Z"
    },
    {
        "title": "La bella y la bestia",
        "image": "./images/movies/la_bella_y_la_bestia.jpg",
        "releaseDate": "1991-02-03T00:00:00.000Z"
    },
    {
        "title": "Las aventuras de Mickey y Pluto",
        "image": "./images/movies/mickey_y_pluto.jpg",
        "releaseDate": "1983-02-03T00:00:00.000Z"
    },
    {
        "title": "Las aventuras de Mickey y Pluto 2",
        "image": "./images/movies/mickey_y_pluto_2.jpg",
        "releaseDate": "1990-02-03T00:00:00.000Z"
    }
]

```

Agregando el parametro **details** con el valor **all** podremos acceder al listado completo de peliculas con todos los personajes asociados.

> /api/movies?details=all

Response 

```

[
    {
        "id": 1,
        "title": "Timon y Pumba",
        "image": "./images/movies/timon_y_pumba.jpg",
        "releaseDate": "1995-02-03T00:00:00.000Z",
        "rating": 4,
        "genere": "Animales",
        "createdAt": "2021-04-19T20:53:33.000Z",
        "updatedAt": "2021-04-19T20:53:33.000Z",
        "Characters": [
            {
                "name": "Timon",
                "character_movie": {
                    "CharacterId": 1,
                    "MovieId": 1
                }
            },
            {
                "name": "Pumba",
                "character_movie": {
                    "CharacterId": 2,
                    "MovieId": 1
                }
            }
        ]
    },
    {
	 "id": 2,
	...
	}
]


```

#### Detalle de Pelicula 

Method: GET

>/api/movies/**:id**

Reemplazar ":id" por el id de la pelicula que queremos obtener

Response
```
{
    "id": 1,
    "title": "Timon y Pumba",
    "image": "./images/movies/timon_y_pumba.jpg",
    "releaseDate": "1995-02-03T00:00:00.000Z",
    "rating": 4,
    "genere": "Animales",
    "createdAt": "2021-04-19T20:53:33.000Z",
    "updatedAt": "2021-04-19T20:53:33.000Z",
    "Characters": [
        {
            "name": "Timon",
            "character_movie": {
                "CharacterId": 1,
                "MovieId": 1
            }
        },
        {
            "name": "Pumba",
            "character_movie": {
                "CharacterId": 2,
                "MovieId": 1
            }
        }
    ]
}

```
#### Crear Pelicula
 Method: **POST**
 
 Body
 ```
{
	"title": "Mickey 3",
	"image": "/images/movies/",
	"releaseDate": "1999-01-20",
	"rating": 4,
	"genere": "Animals"
}

```
Response
```
{
    "id": 6,
    "title": "Mickey 3",
    "image": "/images/movies/mickey3",
    "releaseDate": "1999-01-20T00:00:00.000Z",
    "rating": 4,
    "genere": "Animals",
    "updatedAt": "2021-04-19T21:38:30.685Z",
    "createdAt": "2021-04-19T21:38:30.685Z"
}
```


#### Eliminar una pelicula
 Method: **DELETE**
 
 > api/movies/**/:id**

Reemplazar ":id" por el id de la pelicula que queremos eliminar

Response
```
{
    "msg": "Movie id: '**6**' has been deleted"
}
```

#### Modificar pelicula
 Method: **PATCH**
 
  > api/characters/:id
  
Reemplazar ":id" por el id de la plicula que queremos modificar  

 Body request - ingresamos el campo a modificar
```
{
    "rating": "5"
}
```  
Response - Obtenemos el detalle de la pelicula actualizada
```
{
    "id": 5,
    "title": "Las aventuras de Mickey y Pluto 2",
    "image": "./images/movies/mickey_y_pluto_2.jpg",
    "releaseDate": "1990-02-03T00:00:00.000Z",
    "rating": 5,
    "genere": "Aventura",
    "createdAt": "2021-04-19T20:53:33.000Z",
    "updatedAt": "2021-04-19T21:43:06.000Z"
}

```

#### Búsqueda de Peliculas

Method: **GET**

> /api/movies/search/**:terminodebusqueda**?genere=&sort=

Reemplazar ":terminodebusqueda" por el nombre del personaje que queremos buscar.
Podemos filtrar los resultados por medio de querys params:
- genere : **filtra las peliculas por genero **
- sort: **Ordena los resultados en base al "releaseData". Si el valor es DESC, los ordenara de manera descendente. Si el valor es ASC o no colocamos un valor, los resultados se ordenaran de manera ascendente.

Response
```
[
    {
        "id": 4,
        "title": "Las aventuras de Mickey y Pluto",
        "image": "./images/movies/mickey_y_pluto.jpg",
        "releaseDate": "1983-02-03T00:00:00.000Z",
        "rating": 5,
        "genere": "Aventura",
        "createdAt": "2021-04-19T20:53:33.000Z",
        "updatedAt": "2021-04-19T20:53:33.000Z",
        "Characters": [
            {
                "name": "Mickey Mouse",
                "character_movie": {
                    "CharacterId": 7,
                    "MovieId": 4
                }
            },
            {
                "name": "Pluto",
                "character_movie": {
                    "CharacterId": 8,
                    "MovieId": 4
                }
            }
        ]
    },
    {
        "id": 5,
        "title": "Las aventuras de Mickey y Pluto 2",
        "image": "./images/movies/mickey_y_pluto_2.jpg",
        "releaseDate": "1990-02-03T00:00:00.000Z",
        "rating": 5,
        "genere": "Aventura",
        "createdAt": "2021-04-19T20:53:33.000Z",
        "updatedAt": "2021-04-19T21:43:06.000Z",
        "Characters": [
            {
                "name": "Mickey Mouse",
                "character_movie": {
                    "CharacterId": 7,
                    "MovieId": 5
                }
            },
            {
                "name": "Pluto",
                "character_movie": {
                    "CharacterId": 8,
                    "MovieId": 5
                }
            }
        ]
    }
]
```
