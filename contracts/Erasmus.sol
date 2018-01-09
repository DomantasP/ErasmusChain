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
    bytes32 firstName;
    bytes32 lastName;
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

  function addStudent(bytes32 firstName, bytes32 lastName, uint id) public returns (uint) {
    require(students[id].id == 0);

    students[id] = Student(id, firstName, lastName, msg.sender, msg.sender, false);
    universities[msg.sender].localStudents.push(id);
    return (students[id].id);
  }

  function getStudentName(uint id) public view returns (bytes32) {
    //require(students[id].erasmusUniversity == msg.sender || students[id].erasmusUniversity == msg.sender);

    return (students[id].firstName);
  }

  function getStudentLastName(uint id) public view returns (bytes32) {
    //require(students[id].erasmusUniversity == msg.sender || students[id].erasmusUniversity == msg.sender);

    return (students[id].lastName);
  }

  function getLocalStudentsArray() public view returns (uint[], bytes32[], bytes32[]) {
    require(universities[msg.sender].isSet);

    uint length = universities[msg.sender].localStudents.length;
    bytes32[] memory firstNames = new bytes32[](length);
    bytes32[] memory lastNames = new bytes32[](length);

    for (uint i = 0; i < length; i++) {
      uint id = universities[msg.sender].localStudents[i];
      firstNames[i] = getStudentName(id);
      lastNames[i] = getStudentLastName(id);
    }

    return (universities[msg.sender].localStudents, firstNames, lastNames);
  }

  function getErasmusStudentsArray() public view returns (uint[], bytes32[], bytes32[]) {
    require(universities[msg.sender].isSet);

    uint length = universities[msg.sender].erasmusStudents.length;
    bytes32[] memory firstNames = new bytes32[](length);
    bytes32[] memory lastNames = new bytes32[](length);

    for (uint i = 0; i < length; i++) {
      uint id = universities[msg.sender].erasmusStudents[i];
      firstNames[i] = getStudentName(id);
      lastNames[i] = getStudentLastName(id);
    }

    return (universities[msg.sender].erasmusStudents, firstNames, lastNames);
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