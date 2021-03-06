let chai = require("chai");
let chaiHttp = require("chai-http");
// let server = require("../index3.js");
let app = require("../index.js");
// let faker = require("@faker-js/faker");
const { describe } = require("mocha");
const { response } = require("express");
const { expect } = chai;

chai.should();
chai.use(chaiHttp);

describe("Test one : posts", () => {
    it.skip("get all posts", (done) => {
        chai
            .request(app)
            .get("/api/v1/posts")
            .end((err, res) => {
                res.should.have.status(200);

                done();
            });
    }).timeout(30000);

    // it("get one blog", (done) => {
    //     chai
    //         .request(app)
    //         .get("/api/v1/posts/62718f126576d8f53b49a5ff")
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             done();
    //         });
    // }).timeout(30000);

    it.skip("Create a post + Get one post + updating post + delete post", (done) => {
        chai
            .request(app)
            .post("/api/v1/add_post")
            .set({
                Accept: "application/json"
            })
            .send({
                title: "Coding is fun",
                content: "Have fun for life",
                downvotes: 20,
                upvotes: 2000,
                category: ["Tech", "Programming"],
                comment: ["Wow nice!!"]
            })
            .then((res, err) => {

                const body = res.body;
                expect(body).to.be.a("object");
                expect(res.status).to.be.equal(200);

                const id = body.post._id;

                chai
                    .request(app)
                    .get(`/api/v1/posts/${id}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                    })

                chai
                    .request(app)
                    .put(`/api/v1/posts/${id}`)
                    .set({
                        Accept: "application/json"
                    })
                    .send({
                        title: "Coding is fun",
                        hook: "post",
                        image: "slj",
                        content: "Have fun for life",
                        downvotes: 20,
                        upvotes: 2000,
                        category: ["Tech", "Programming"],
                        comment: ["Wow nice!!"]
                    })
                    .then((res) => {
                        const body = res.body;
                        expect(body).to.be.a("object");

                        chai
                            .request(app)
                            .delete(`/api/v1//posts/${id}`)
                            .set({
                                Accept: "application/json"
                            })
                            .then((res) => {
                                res.should.have.status(204);
                                done();
                            });

                    })
                    .catch((err) => done(err));
            });
    }).timeout(30000);


    it('Comment on an article.', (done) => {

        chai.request(app).post('/api/v1/posts/62719a0c460675c865ed2606/comments')
            .set({
                Accept: 'application/json'
            })
            .send({

                "message": "cool"
            })
            .then((res) => {
                const body = res.body;
                expect(body).to.be.a('object');
                // expect(body).to.contain.property('success');
                done();
            })
            .catch((err) => done(err))
    }).timeout(50000);

});


describe("Test two: Users", () => {
    it("get all users", (done) => {
        chai
            .request(app)
            .get("/api/v1/users")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    }).timeout(30000);

    // it("get one user", (done) => {
    //     chai
    //         .request(app)
    //         .get("/api/v1/users/3")
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             done();
    //         });
    // }).timeout(30000);

    // it("Create a user + Get one user", (done) => {
    //     chai
    //         .request(app)
    //         .post("/api/v1/add_user")
    //         .set({
    //             Accept: "application/json"
    //         })
    //         .send({
    //             username: "Fran??oise",
    //             email: "Fran??oise@gmail.com",
    //             password: "F20jowej,"
    //         })
    //         .then((res) => {
    //             const body = res.body;
    //             expect(body).to.be.a("object");

    //             const id = body.user._id;

    //             chai
    //                 .request(app)
    //                 .get(`/api/v1/users/${id}`)
    //                 .end((err, res) => {
    //                     res.should.have.status(404);
    //                     done();
    //                 });



    //         })
    //         .catch((err) => done(err));
    // }).timeout(30000);

    it("User logging in", (done) => {
        chai
            .request(app)
            .post("/api/v1/login")
            .send({
                email: "Fran??o@gmail.com",
                password: "*******"

            })
            .then((res) => {
                res.should.have.status(404)
                // const body = res.status;
                // expect(body).to.have.status(404);

                done();
            })
            .catch((err) => done(err));
    }).timeout(30000);

});
