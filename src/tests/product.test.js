require('../models')
const request = require("supertest")
const app = require("../app")
const Category = require("../models/Category")


const URL_BASE_USER = '/users/login'
const URL_BASE = '/products'
let TOKEN
let category
let product
let productId

beforeAll(async () => {

  //LOGIN
  const user = {
    email: "fernando@gmail.com",
    password: 'fernando1234'
  }
  const res = await request(app)
    .post(URL_BASE_USER)
    .send(user)

  TOKEN = res.body.token


  category = await Category.create({ name: "Tecnologia" })



  // para crear un producto debe tener tambien su fk, y aca se lo ponemos creando una categoria y asignandole de esa categoria el id, para llenar ese campo de categoryId
  product = {
    title: "Pendrive 64gb",
    description: 'lorem20',
    price: 11.99,
    categoryId: category.id
  }

})

test("POST -> 'URL_BASE', should return status code 201, res.body to be defined and res.body.title === product.title", async () => {
    const res = await request(app)
      .post(URL_BASE)
      .send(product)
      .set('Authorization', `Bearer ${TOKEN}`)
  
    productId = res.body.id
  
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)

})

test("GET -> 'URL_BASE', should return status code 200, res.body to be defined and res.body.length === 1", async () => {
    
    const res = await request(app)
    .get(URL_BASE)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    
    expect(res.body[0].category).toBeDefined()
    expect(res.body[0].category.id).toBe(category.id)
    
    
    await category.destroy()
  })  