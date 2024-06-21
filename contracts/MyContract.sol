// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MyContract {
   string public storedCID;

    function setCID(string memory _cid) public {
        storedCID = _cid;
    }

    function getCID() public view returns (string memory) {
        return storedCID;
    }
}

