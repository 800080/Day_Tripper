const db = require("./db")
const {
  User,
  Trip,
  Event,
  ChatMessage,
  MapLocation,
  UserTrip,
} = require("./models")

const seedUser = [
  {
    name: "Admin",
    username: "admin",
    email: "admin@email.com",
    isAdmin: true,
    password: "123"
  },
  {
    name: "Amadi",
    username: "Samba Queen💃🏾",
    email: "amadi@email.com",
    password: "123"
  },
  {
    name: "Andrew",
    username: "musicman",
    email: "andrew@email.com",
    password: "123"
  },
  {
    name: "Horace",
    username: "Rocky",
    email: "horace@email.com",
    password: "123"
  },
  {
    name: "Jason",
    username: "json",
    email: "jason@email.com",
    password: "123"
  }
]

const seedTrip = [
  {
    title:"Graduation Trip",
    startDate: new Date("10/31/20"),
    endDate:new Date("11/07/20"),
    notes: "Celebration!!!"
  },
  {
    title:"Electric Daisy Carnival",
    startDate: new Date("05/18/21"),
    endDate: new Date("05/25/21"),
    notes: "Partaaaay!!!"
  },
  {
    title:"Grand Canyon",
    startDate: new Date("08/10/21"),
    endDate:new Date("08/24/21"),
    notes: "Nature!!!"
  },
]

const seedEvent = [
  {
   title: "Dinner",
   startTime:new Date("10/31/20 20:00:00"),
   endTime:new Date("10/31/20 22:00:00"),
   notes: "Eat or Die!",
  },
  {
    title:"Snorkeling",
    startTime:new Date("11/03/20 10:00:00"),
    endTime:new Date("11/03/20 11:00:00"),
    notes: "See pretty fish",
   },
   {
    title:"Jet skiing",
    startTime:new Date("11/04/20 11:00:00"),
    endTime:new Date("11/04/20 17:00:00"),
    notes: "Life jackets mandatory",
   },
]

const seedChatMessages = [
  {
    message:"Can't wait to graduate!",
  },
  {
    message:"What should I pack?",
  },
  {
    message:"Bring an umbrella",
  },
]

const seedMapLocations = [
  {
    coordinate:{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  },
  {
    coordinate:{
      latitude: 37.78825,
      longitude: -102.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  },
  {
    coordinate:{
      latitude: 27.78825,
      longitude: -142.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  },
]

async function seed() {
  await db.sync({ force: true })

  const createdUsers = await Promise.all(seedUser.map(user => User.create(user)))
  const createdTrips = await Promise.all(seedTrip.map(trip => Trip.create(trip)))
  const createdEvents = await Promise.all(seedEvent.map(event => Event.create(event)))
  const createdChatMessages = await Promise.all(seedChatMessages.map(message => ChatMessage.create(message)))
  const createdMapLocations = await Promise.all(seedMapLocations.map(location => MapLocation.create(location)))

  await createdTrips[0].addEvents(createdEvents)
  await createdTrips[0].addUsers(createdUsers)
  await createdTrips[1].addUsers(createdUsers)
  await createdTrips[2].addUsers(createdUsers)
  await createdTrips[0].addChatMessages(createdChatMessages)
  await createdChatMessages[0].setUser(createdUsers[1])
  await createdChatMessages[1].setUser(createdUsers[2])
  await createdChatMessages[2].setUser(createdUsers[3])

  await createdTrips[0].setMapLocation(createdMapLocations[0])
  await createdEvents[0].setMapLocation(createdMapLocations[0])
  await createdEvents[1].setMapLocation(createdMapLocations[1])
  await createdEvents[2].setMapLocation(createdMapLocations[2])

  const userTrip = await UserTrip.findOne({where: {userId: 2}})
  await userTrip.update({isHost: true, status: "accepted"})
  console.log('magic methods mapLocation>>>>>> ', createdMapLocations[0].__proto__)
  console.log("db synced!")
}

async function runSeed() {
  console.log("seeding...")
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log("closing db connection")
    await db.close()
    console.log("db connection closed")
  }
}

runSeed()
