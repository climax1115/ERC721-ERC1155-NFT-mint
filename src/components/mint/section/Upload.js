import React, { useState, useRef, useEffect } from "react";
import "react-dropzone-uploader/dist/styles.css";
import 'react-notifications/lib/notifications.css';
import Dropzone from "react-dropzone-uploader";
import createClient from 'ipfs-http-client'
import PulseLoader from "react-spinners/PulseLoader";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import useMint from "../../../hooks/useMint";
import { useWeb3React } from '@web3-react/core';

const allowType = ['jpeg', 'png', 'gif', 'svg', 'mp4', 'webm', 'mp3', 'wav', 'ogg', 'glb', 'gltf', 'mpeg'];
const client = createClient('https://ipfs.infura.io:5001/api/v0');

export default function Upload() {
  const mainDropzone = useRef()
  const previewDropzone = useRef()
  const { account, chainId } = useWeb3React()
  const [requirePreview, setRequirePreview] = useState(false);
  const [type, setType] = useState();
  const [nftName, setNftName] = useState();
  const [artist, setArtist] = useState();
  const [nftPrice, setNftPrice] = useState();
  // const [supply, setSupply] = useState();
  const [nftDescription, setNftDescription] = useState();
  const [loading, setLoading] = useState(false)

  const { onMint } = useMint(chainId);

  const _handleMain = async (file, status) => {
    if (status === "done") {
      const fileType = file.file.type.split('/');
      if (allowType.indexOf(fileType[1]) === -1) {
        NotificationManager.warning('File not allowed', '', 3000);
        return file.remove();
      }
      setType(fileType[0]);
      if (fileType[0] === "image") {
        setRequirePreview(false)
      } else {
        setRequirePreview(true)
      }
    }

    if (status === "removed") {
      setRequirePreview(false)
    }
  }

  const _handlePrev = async (file, status) => {
    if (status === "done") {
      const fileType = file.file.type.split('/');
      if (allowType.indexOf(fileType[1]) === -1) {
        NotificationManager.warning('File not allowed', '', 3000);
        return file.remove();
      }
      if (fileType[0] !== "image") return file.remove();
    }
  }

  const onCreate = async () => {
    if (loading) return;
    if (!account) return;
    if (!mainDropzone.current.files.length) return NotificationManager.warning('Please upload NFT file', '', 3000);
    if (!nftName || !nftPrice || !artist) return NotificationManager.warning('Please fill out all forms', '', 3000);

    let nftInfo = {
      url: '',
      preview: '',
      type,
      artist,
      name: nftName,
      price: nftPrice,
      maxSupply: 1,
      creater: account,
      description: nftDescription,
      createdAt: new Date().getTime()
    }
    setLoading(true);
    const mainReader = new window.FileReader();
    mainReader.readAsArrayBuffer(mainDropzone.current.files[0].file);
    mainReader.onloadend = async () => {
      try {
        const added = await client.add(Buffer(mainReader.result))
        nftInfo.url = `https://ipfs.infura.io/ipfs/${added.path}`;

        if (previewDropzone.current && previewDropzone.current.files.length) {
          const PreReader = new window.FileReader();
          PreReader.readAsArrayBuffer(previewDropzone.current.files[0].file);
          PreReader.onloadend = async () => {
            try {
              const added = await client.add(Buffer(PreReader.result))
              nftInfo.preview = `https://ipfs.infura.io/ipfs/${added.path}`;
              _mint(nftInfo)
            } catch (error) {
              console.log(error)
              setLoading(false);
              NotificationManager.warning('Mint failed', '', 3000);
            }
          }
        } else {
          _mint(nftInfo)
        }
      } catch (error) {
        console.log(error)
        setLoading(false);
        NotificationManager.warning('Mint failed', '', 3000);
      }
    }
  }

  const _mint = async (nftInfo) => {
    try {
      const added = await client.add(JSON.stringify(nftInfo))
      const uri = `https://ipfs.infura.io/ipfs/${added.path}`;
      const tx = await onMint(nftPrice, uri, 1, nftInfo.artist);
      if (tx.status === true) {
        NotificationManager.success('Minted successfully', '', 3000);
        mainDropzone.current.files[0].remove();
      } else {
        NotificationManager.warning('Transaction was failed', '', 3000);
      }

      setNftName("")
      setNftPrice(0)
      // setSupply(0)
      setNftDescription("")
      setArtist('')
    } catch (error) {
      console.log(error)
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center py-24">
      <div className="upload mint-container px-8 md:px-0 flex w-full md:w-1/2 lg:w-1/3 xl:w-1/5 h-52 flex-col space-y-6">
        <Dropzone
          ref={mainDropzone}
          onChangeStatus={_handleMain}
          maxFiles={1}
          multiple={false}
          canCancel={false}
          inputContent={(files, extra) => (extra.reject ? 'Drag/Drop Files here' : 'Drag/Drop Files here')}
          styles={{
            dropzoneActive: { borderColor: 'green' },
          }}
        />
        {
          requirePreview && (
            <Dropzone
              ref={previewDropzone}
              onChangeStatus={_handlePrev}
              maxFiles={1}
              accept="image/jpeg,image/png,image/svg,image/gif"
              multiple={false}
              canCancel={false}
              inputContent={(files, extra) => (extra.reject ? 'Preview Image (Optional)' : 'Preview Image (Optional)')}
              styles={{
                dropzoneActive: { borderColor: 'green' },
              }}
            />
          )
        }
        <div className="w-full space-y-6">
          <input
            type="text"
            placeholder="Artist address"
            className="w-full p-4 border-1 border-gray-400 rounded-md text-black"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
          <input
            type="text"
            placeholder="Item name"
            className="w-full p-4 border-1 border-gray-400 rounded-md text-black"
            value={nftName}
            onChange={(e) => setNftName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            className="w-full p-4 border-1 border-gray-400 rounded-md text-black "
            value={nftPrice}
            onChange={(e) => setNftPrice(e.target.value)}
          />
          {/* <input
            type="number"
            placeholder="Supply"
            className="w-full p-4 border-1 border-gray-400 rounded-md text-black "
            value={supply}
            onChange={(e) => setSupply(e.target.value)}
          /> */}
        </div>
        <div className="w-full">
          <textarea
            type="text"
            placeholder="Description"
            className="w-full p-4 border-1 border-gray-400 rounded-md text-black h-40"
            style={{
              resize: "none"
            }}
            value={nftDescription}
            onChange={(e) => setNftDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="w-full flex justify-center mt-10">
          <button
            onClick={onCreate}
            disabled={!Boolean(account)}
            className={(!Boolean(account) ? 'disabled ' : '') + "w-1/2 flex flex-row text-white py-2 bg-gradient-to-r from-yellow-rasta to-green-rasta items-center justify-center space-x-4 text-xl rounded-xl cursor-pointer"}
          >
            {
              loading ?
                <PulseLoader size={10} color="white" />
                :
                <span>CREATE</span>
            }
          </button>
        </div>
      </div>
      <NotificationContainer />
    </div>
  );
}
