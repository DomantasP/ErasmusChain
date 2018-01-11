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
    bytes32[] courseId;
    bytes32[] title;
    int[] credits;
    int[] mark;
    bool[] isDone;
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

    students[id] = Student(id, firstName, lastName, msg.sender, msg.sender, false, new bytes32[](0), new bytes32[](0), new int[](0), new int[](0), new bool[](0));
    universities[msg.sender].localStudents.push(id);
    return (students[id].id);
  }

  function getStudentName(uint id) public view returns (bytes32) {
    return (students[id].firstName);
  }

  function getStudentLastName(uint id) public view returns (bytes32) {
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

  function setCourse(uint studentId, bytes32 courseId, bytes32 title, int credits) public {
    require(universities[msg.sender].isSet);
    require(students[studentId].originUniversity == msg.sender);

    students[studentId].courseId.push(courseId);
    students[studentId].title.push(title);
    students[studentId].credits.push(credits);
    students[studentId].mark.push(0);
    students[studentId].isDone.push(false);
  }

  function validateCourse(uint studentId, bytes32 courseId, int mark, bool isDone) public {
    require(universities[msg.sender].isSet);
    require(students[studentId].erasmusUniversity == msg.sender);

    for (uint i = 0; i < students[studentId].courseId.length; i++) {
      if (students[studentId].courseId[i] == courseId) {
            students[studentId].mark[i] = mark;
            students[studentId].isDone[i] = isDone;
      }
    }
  }

  function getCoursesArray(uint studentId) public view returns (bytes32[], bytes32[], int[], int[], bool[]) {
    require(msg.sender == students[studentId].originUniversity || msg.sender == students[studentId].erasmusUniversity);

    return (students[studentId].courseId, students[studentId].title, students[studentId].credits, students[studentId].mark, students[studentId].isDone);
  }

  function removeCourse(uint studentId, bytes32 courseId) public {
    require(msg.sender == students[studentId].originUniversity);

    for (uint i = 0; i < students[studentId].courseId.length; i++) {
      if (students[studentId].courseId[i] == courseId) {
        students[studentId].courseId = removeBytes32(i, students[studentId].courseId);
        students[studentId].title = removeBytes32(i, students[studentId].title);
        students[studentId].credits = removeInt(i, students[studentId].credits);
        students[studentId].mark = removeInt(i, students[studentId].mark);
        students[studentId].isDone = removeBool(i, students[studentId].isDone);
      }
    }
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

  function removeInt(uint index,int[] storage array) private returns(int[]) {
    if (index >= array.length)
      return;

    for (uint i = index; i<array.length-1; i++){
        array[i] = array[i+1];
    }
    delete array[array.length-1];
    array.length--;
    return array;
  }

  function removeBytes32(uint index, bytes32[] storage array) private returns(bytes32[]) {
    if (index >= array.length)
      return;

    for (uint i = index; i<array.length-1; i++){
        array[i] = array[i+1];
    }
    delete array[array.length-1];
    array.length--;
    return array;
  }

  function removeBool(uint index, bool[] storage array) private returns(bool[]) {
    if (index >= array.length)
      return;

    for (uint i = index; i<array.length-1; i++){
        array[i] = array[i+1];
    }
    delete array[array.length-1];
    array.length--;
    return array;
  }
}