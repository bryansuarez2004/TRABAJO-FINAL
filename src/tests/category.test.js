const request = require("supertest")
const app = require("../app")

const URL_BASE = '/categories'
const category = {
    name:'electronica'
}

let TOKEN

beforeAll(async()=>{
    const user ={
        email: "fernando@gmail.com",
        password: 'fernando1234',
    }
    const res = await request(app)
    .post(`${URL_BASE}/login`)
    .send(user)

    TOKEN = res.body.token
})

test("POST -> 'URL_BASE', should return status code 201, res.body to be defined and res.body.name === category.name", async () => {
    const res = await request(app)
      .post(URL_BASE)
      .send(category)
      .set("Authorization", `Bearer ${TOKEN}`)
     console.log(res);
  
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(category.name)
  })