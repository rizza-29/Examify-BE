const config = require('./config')
const {Sequelize,DataTypes} = require('sequelize')

const sequelize = new Sequelize (
    config.DB,
    config.USER,
    config.PASSWORD, {
        host:config.HOST,
        dialect:config.dialect
    },
)

sequelize.authenticate()
.then(()=>{
    console.log("connected")
})
.catch(err=>{
    console.log(err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.sequelize.sync({ alter:true })
.then(()=>{
    console.log("re-sync done!")
})

db.center = require('./models/center')
db.roles = require('./models/topic')
db.user = require('./models/users')
db.topic = require('./models/topic')
db.class = require('./models/class')
db.subject = require('./models/subject')
db.questions = require('./models/questions')
db.mcqs = require('./models/mcqs')
db.choices = require('./models/choices')
db.answer = require('./models/answer')
db.checkers = require('./models/checkers')
db.chapter = require('./models/chapter')


// User
db.roles.hasMany(db.user,{
    foriegnKey:'role_id'
})
db.user.belongsTo(db.roles,{ foriegnKey:'role_id' })


// Class
db.center.hasMany(db.class, {
    foriegnKey: 'center_id'
})
db.class.belongsTo(db.center, {
    foriegnKey: 'center_id'
})


// Subject
db.class.hasMany(db.subject, {
    foriegnKey: 'class_id'
})
db.subject.belongsTo(db.class, {
    foriegnKey: 'class_id'
})

db.user.hasMany(db.subject, {
    foriegnKey: 'user_id'
})
db.subject.belongsTo(db.user, {
    foriegnKey: 'user_id'
})


// Chapter
db.subject.hasMany(db.chapter, {
    foriegnKey: 'subject_id'
})
db.chapter.belongsTo(db.subject, {
    foriegnKey: 'subject_id'
})


// Topic
db.chapter.hasMany(db.topic, {
    foriegnKey: 'chapter_id'
})
db.topic.belongsTo(db.chapter, {
    foriegnKey: 'chapter_id'
})


// Questions
db.topic.hasMany(db.questions, {
    foriegnKey: 'topic_id'
})
db.questions.belongsTo(db.topic, {
    foriegnKey: 'topic_id'
})


// Answer
db.questions.hasMany(db.answer, {
    foriegnKey: 'question_id'
})
db.answer.belongsTo(db.questions, {
    foriegnKey: 'question_id'
})

// MCQs
db.topic.hasMany(db.mcqs, {
    foriegnKey: 'topic_id'
})
db.mcqs.belongsTo(db.topic, {
    foriegnKey: 'topic_id'
})

// Choices
db.mcqs.hasMany(db.choices, {
    foriegnKey: 'mcqs_id'
})
db.choices.belongsTo(db.mcqs, {
    foriegnKey: 'mcqs_id'
})

// Checkers

db.user.hasMany(db.checkers, {
    foriegnKey: 'user_id'
})
db.checkers.belongsTo(db.user, {
    foriegnKey: 'user_id'
})

db.subject.hasMany(db.checkers, {
    foriegnKey: 'subject_id'
})
db.checkers.belongsTo(db.subject, {
    foriegnKey: 'subject_id'
})

db.questions.hasMany(db.checkers, {
    foriegnKey: 'question_id'
})
db.checkers.belongsTo(db.questions, {
    foriegnKey: 'question_id'
})