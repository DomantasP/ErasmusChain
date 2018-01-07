pragma solidity ^0.4.11;

contract Erasmus {
  struct University {
    string title;
    bool isSet;
    uint[] localStudents;
    uint[] erasmusStudents;
  }

  struct Student {
    uint id;
    string firstName;
    string lastName;
    address originUniversity;
    address erasmusUniversity;
    bool isOnErasmus;
    mapping (string => Course) courses;
  }

  struct Course {
    string title;
    int credits;
    int mark;
    bool isDone;
  }

  mapping (uint => Student) students;
  mapping (address => University) private universities;

  function createUniversity(string title) public returns (string) {
    require(!universities[msg.sender].isSet);
    require(utfStringLength(title) > 2);

    universities[msg.sender] = University({
      title: title,
      isSet: true,
      localStudents: new uint[](0),
      erasmusStudents: new uint[](0)
      });
    return universities[msg.sender].title;
  }

  function getUniversityTitle(address universityAddress) public view returns (string) {
    return universities[universityAddress].title;
  }

  function setErasmusUniversity(uint studentId, address erasmusUniversityAddress) public {
    require(universities[erasmusUniversityAddress].isSet);

    students[studentId].erasmusUniversity = erasmusUniversityAddress;
    universities[erasmusUniversityAddress].erasmusStudents.push(studentId);
  }

  function getErasmusUniversity(uint id) public view returns (address) {
    require(students[id].originUniversity == msg.sender || students[id].erasmusUniversity == msg.sender);

    return students[id].erasmusUniversity;
  }

  function addStudent(string firstName, string lastName, uint id) public returns (uint) {

    students[id] = Student(id, firstName, lastName, msg.sender, msg.sender, false);
    return (students[id].id);
  }

  function getStudentName(uint id) public view returns (string) {
    require(students[id].erasmusUniversity == msg.sender || students[id].erasmusUniversity == msg.sender);

    return (students[id].firstName);
  }

  function setCourse(uint studentId, string courseId, string title, int credits) public {
    require(universities[msg.sender].isSet);
    require(students[studentId].originUniversity == msg.sender);

    students[studentId].courses[courseId] = Course(title, credits, 0, false);
  }

  function validateCourse(uint studentId, string courseId, int mark, bool isDone) public {
    require(universities[msg.sender].isSet);
    require(students[studentId].erasmusUniversity == msg.sender);

    students[studentId].courses[courseId].mark = mark;
    students[studentId].courses[courseId].isDone = isDone;
  }

  function getCourseTitle(uint studentId, string courseId) public view returns (string) {
    require(universities[msg.sender].isSet);
    require(msg.sender == students[studentId].originUniversity || msg.sender == students[studentId].erasmusUniversity);

    return students[studentId].courses[courseId].title;
  }

  function getMark(uint studentId, string courseId) public view returns (int) {
    require(universities[msg.sender].isSet);
    require(msg.sender == students[studentId].originUniversity || msg.sender == students[studentId].erasmusUniversity);

    return students[studentId].courses[courseId].mark;
  }

  function utfStringLength(string str) public pure
  returns (uint length)
  {
      uint i = 0;
      bytes memory stringRep = bytes(str);

      while (i<stringRep.length)
      {
          if (stringRep[i]>>7==0)
              i += 1;
          else if (stringRep[i]>>5==0x6)
              i += 2;
          else if (stringRep[i]>>4==0xE)
              i += 3;
          else if (stringRep[i]>>3==0x1E)
              i += 4;
          else
              i += 1;

          length++;
      }
  }
}