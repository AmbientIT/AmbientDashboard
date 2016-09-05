import User from '../models/user.model.js'

export default async () => {
  try {
    const users = await User.find().limit(1)
    if (users.length === 0) {
      const adminUser = new User({
        username: 'admin',
        password: 'admin',
      })
      await adminUser.save()
    }
  } catch (err) {
    console.error(err)
  }
}
