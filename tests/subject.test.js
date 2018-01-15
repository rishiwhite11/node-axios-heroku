const request = require("supertest");
const expect = require("expect");
const {ObjectID} = require("mongodb");

const app = require("../app");
const Subject = require("../models/subject");

const subjects = [
    {   
        _id: new ObjectID(),
        name:"Java",
        difficulty: 2
    },
    {   
        _id: new ObjectID(),
        name: "C++",
        difficulty: 6
    }
]
beforeEach((done) => {
    Subject.remove({}).then(() => {
        return Subject.insertMany(subjects);
    }).then(() => done())
})

describe("POST /", () => {
    it("Should add a new subject in database", (done) => {
        request(app).post("/")
        .send({
            name: "Ruby",
            difficulty: 4
        }).expect(201)
        .expect((res) => {
            expect(res.body.subject.name).toBe("Ruby");
        }).end((err, res) => {
            if(err){
                return done(err);
            }
            Subject.find({name:"Ruby"}).then((results) => {
                expect(results.length).toBe(1);
                expect(results[0].name).toBe("Ruby");
                done();
            }).catch((e) => done(e));
        });
    })
    it("Should not create an object with invalid data ", (done) => {
        request(app).post("/")
        .send({})
        .expect(400)
        .expect((res) => {
            expect(res.body.text).toBe("Wrong data");
        }).end((err, res) => {
            if(err){
                return done(err);
            }
            Subject.find({}).then((results) =>{
                expect(results.length).toBe(2);
                done();
            }).catch((e) => done(e));
        })
    })
})

describe("GET /", () => {
    it("Should display all the values", (done) => {
        request(app).get("/")
        .expect(200)
        .expect((res) => {
            expect(res.body.length).toBe(2)
        }).end(done);
    })
    it("Should test the path parameters", (done) => {
        var id = subjects[0]._id.toHexString();
        request(app).get(`/${id}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.results.name).toBe("Java");
        }).end(done);
    })

})
describe("PATCH", () => {
    it("Should update the current record", (done) => {
        var id = subjects[0]._id.toHexString();
        request(app).patch(`/${id}`)
        .send({
            name: "MeteorJS"
        }).expect(200)
        .expect((res) => {
            expect(res.body.subject.name).toBe("MeteorJS")
        }).end(done);
    })
})