var Erasmus = artifacts.require('./Erasmus.sol')

contract('Erasmus', function(accounts) {
  let ErasmusInstance
  let vilniusUniTitle
  let thessallyUniTitle

  it('...should create two universities', function() {
    return Erasmus.deployed()
      .then(function(instance) {
        ErasmusInstance = instance

        return ErasmusInstance.createUniversity('Vilnius University', {
          from: accounts[0]
        })
      })
      .then(function(instance) {
        return ErasmusInstance.createUniversity('University of Thessaly', {
          from: accounts[1]
        })
      })
      .then(function() {
        return ErasmusInstance.getUniversityTitle(accounts[0])
      })
      .then(function(title) {
        vilniusUniTitle = title
      })
      .then(function() {
        return ErasmusInstance.getUniversityTitle(accounts[1])
      })
      .then(function(title) {
        thessallyUniTitle = title
      })
      .then(function(name) {
        assert.equal(
          vilniusUniTitle,
          'Vilnius University',
          "The university wasn't created."
        )
        assert.equal(
          thessallyUniTitle,
          'University of Thessaly',
          "The university wasn't created."
        )
      })
  })

  it("...should create and add student to student's array", function() {
    return Erasmus.deployed()
      .then(function() {
        return ErasmusInstance.addStudent('Domantas', 'Pelaitis', 1510738, {
          from: accounts[0]
        })
      })
      .then(function() {
        return ErasmusInstance.getStudentName(1510738, {
          from: accounts[0]
        })
      })
      .then(function(name) {
        assert.equal(name, 'Domantas', "The student's was not added.")
      })
  })

  it("...should set student's erasmus university", function() {
    Erasmus.deployed()
      .then(function() {
        ErasmusInstance.setErasmusUniversity(1510738, accounts[1], {
          from: accounts[0]
        })
      })
      .then(function() {
        return ErasmusInstance.getErasmusUniversity(1510738, {
          from: accounts[0]
        })
      })
      .then(function(address) {
        assert.equal(
          address,
          accounts[1],
          'The erasmus university was not set.'
        )
      })
      .then(function() {})
  })

  it('...should create a course and set course values', function() {
    return Erasmus.deployed()
      .then(function() {
        return ErasmusInstance.setCourse(1510738, 'UTH05', 'Cryptography', 5, {
          from: accounts[0]
        })
      })
      .then(function() {
        return ErasmusInstance.setCourse(
          1510738,
          'UTH11',
          'Computer Vision',
          5,
          {
            from: accounts[0]
          }
        )
      })
      .then(function() {
        return ErasmusInstance.getCourseTitle(1510738, 'UTH11', {
          from: accounts[0]
        })
      })
      .then(function(title) {
        assert.equal(
          title,
          'Computer Vision',
          'The returned title is not correct.'
        )
      })
      .then(function() {
        return ErasmusInstance.getCourseTitle(1510738, 'UTH05', {
          from: accounts[0]
        })
      })
      .then(function(title) {
        assert.equal(
          title,
          'Cryptography',
          'The returned title is not correct.'
        )
      })
      .catch(function(error) {
        console.log(error.toString())
      })
  })

  it('...should validate existing courses', function() {
    return Erasmus.deployed()
      .then(function() {
        return ErasmusInstance.validateCourse(1510738, 'UTH05', 10, true, {
          from: accounts[1]
        })
      })
      .then(function() {
        return ErasmusInstance.validateCourse(1510738, 'UTH11', 5, true, {
          from: accounts[1]
        })
      })
      .then(function() {
        return ErasmusInstance.getMark(1510738, 'UTH11', {
          from: accounts[1]
        })
      })
      .then(function(mark) {
        assert.equal(
          mark.toString(10),
          '5',
          'The returned grade is not correct.'
        )
      })
      .then(function() {
        return ErasmusInstance.getMark(1510738, 'UTH05', {
          from: accounts[1]
        })
      })
      .then(function(mark) {
        assert.equal(
          mark.toString(10),
          '10',
          'The returned grade is not correct.'
        )
      })
      .catch(function(error) {
        console.log(error.toString())
      })
  })
})
