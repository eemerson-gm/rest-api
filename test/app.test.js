/*
    FILE: app.test.js
    PROJECT: Backend Programming Assignment
    PROGRAMMER: Eric Emerson
    FIRST-VERSION: 2021-03-31
    DESCRIPTION:
        The function of this file is to test the post API server endpoints functionality.
*/

//Imports the expect test library.
var expect = require("chai").expect;
const fetch = require("node-fetch");

//Defines the requesting server url.
var url = "http://localhost:3000";

describe("Testing Posts", function(){

    it("0 - Create a new post", async () => {

        //Sends a query to the server API.
        var res = await fetch(url + "/api/posts/create/User1/Hello", {

            //Sets the method to query the API with.
            method: 'PUT'

        });

        expect(res.status).to.equal(201)

    });

    it("1 - Create a reply on a post", async () => {

        //Sends a query to the server API.
        var res = await fetch(url + "/api/reply/create/User1/User2/Hello", {

            //Sets the method to query the API with.
            method: 'PUT'

        });

        //Expects the response to return an okay.
        expect(res.status).to.equal(201);

    });

    it("2 - Create a like on a post", async () => {

        //Sends a query to the server API.
        var res = await fetch(url + "/api/like/create/User1/User2", {

            //Sets the method to query the API with.
            method: 'PUT'

        });

        //Expects the response to return an okay.
        expect(res.status).to.equal(201);

    });

    it("3 - Edit an existing post", async () => {

        //Sends a query to the server API.
        var res = await fetch(url + "/api/posts/edit/User1/Goodbye", {

            //Sets the method to query the API with.
            method: 'POST'

        });

        expect(res.status).to.equal(201)

    });

    it("4 - Edit an existing reply", async () => {

        //Sends a query to the server API.
        var res = await fetch(url + "/api/reply/edit/User1/User2/Goodbye", {

            //Sets the method to query the API with.
            method: 'POST'

        });

        expect(res.status).to.equal(201)

    });

    it("5 - Delete an existing reply", async () => {

        //Sends a query to the server API.
        var res = await fetch(url + "/api/reply/delete/User1/User2", {

            //Sets the method to query the API with.
            method: 'DELETE'

        });

        //Expects the response to return an okay.
        expect(res.status).to.equal(204);

    });

    it("6 - Delete an existing post", async () => {

        //Sends a query to the server API.
        var res = await fetch(url + "/api/posts/delete/User1", {

            //Sets the method to query the API with.
            method: 'DELETE'

        });

        //Expects the response to return an okay.
        expect(res.status).to.equal(204);

    });

});
