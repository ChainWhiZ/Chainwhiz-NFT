// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// NFT contract to inherit from.
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
//Counter
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
//To convert the token URI to base64
import "./lib/Base64.sol";

contract Chainwhiz_Solver_NFT is ERC721, Ownable {
    struct ChainwhizMembers {
        string name;
        string nftURI;
    }
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    ChainwhizMembers members;

    //mapping from the nft's tokenId => that NFTs attributes.
    mapping(uint256 => ChainwhizMembers) public nftHolderAttributes;

    // A mapping from an address => the NFTs tokenId. Gives me an ez way
    // to store the owner of the NFT and reference it later.
    mapping(address => uint256) public nftHolders;

    constructor(string memory characterNames, string memory characterImageURIs)
        ERC721("Chainwhiz GOAT Solvers", "CZ_GOAT_SOLVER")
    {
        members = (
            ChainwhizMembers({name: characterNames, nftURI: characterImageURIs})
        );

        // I increment _tokenIds here so that my first NFT has an ID of 1.
        // More on this in the lesson!
        _tokenIds.increment();
    }

    // Users would be able to hit this function and get their NFT based on the
    // characterId they send in!
    function mintCharacterNFT(address _to) external onlyOwner {
        // Get current tokenId (starts at 1 since we incremented in the constructor).
        uint256 newItemId = _tokenIds.current();

        // The magical function! Assigns the tokenId to the caller's wallet address.
        _safeMint(_to, newItemId);

        // We map the tokenId => their character attributes. More on this in
        // the lesson below.
        nftHolderAttributes[newItemId] = ChainwhizMembers({
            name: members.name,
            nftURI: members.nftURI
        });

        // console.log("Minted NFT w/ tokenId %s and characterIndex %s", newItemId, _characterIndex);

        // Keep an easy way to see who owns what NFT.
        nftHolders[_to] = newItemId;

        // Increment the tokenId for the next person that uses it.
        _tokenIds.increment();
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        ChainwhizMembers memory charAttributes = nftHolderAttributes[_tokenId];

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        charAttributes.name,
                        " -- NFT #: ",
                        Strings.toString(_tokenId),
                        '", "description": "Solve bounties from Web3 projects, get paid in crypto, and collect this cool NFT", "image": "',
                        charAttributes.nftURI,
                        '"}'
                    )
                )
            )
        );

        string memory output = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        return output;
    }
}
