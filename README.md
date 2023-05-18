## Visitation

## Server

A Firebase function is triggered to fetch data from a web api and that data is then saved to RTDB.

This is an example of what the final JSON objects look like in the Real Time Data Base:

```json
{
	"id": 1234, // should be a unique ID you generate
	"name": "London",
	"country": "UK",
	"visited": false,
	"image": "<https://images.net/london.jpg>"
}

```

### UI

Objective: build a UI that displays and allows for interaction with the Cities.
A user can mark a site as visted or nonvisited. 
They can also filter the visted sites


## Wireframe

![example-ui](https://user-images.githubusercontent.com/16907570/230651777-d8a3c3f5-be4b-4c4d-8b70-0c941a9e00a7.png)

## Image
![Screenshot 2023-05-17 at 7 09 22 PM](https://github.com/KStockton/Visitation/assets/34406483/4c7c4c84-a67b-4213-86fe-cfd567a0875f)

## Tech 

Firebase Client SDK
Firebase Realtime Database
React
CSS
HTML