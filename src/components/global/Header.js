import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import useMetaMask from '../../hooks/useMetamask';
import EtherIcon from "../../assets/networks/ether.webp";
import PolygonIcon from "../../assets/networks/polygon.webp";
import BscIcon from "../../assets/networks/bsc.webp";
import { supportedNetworks } from "../../config/constants/constants";
import getRpcUrl from "../../utils/getRpcUrl";
const networks = ['ehtereum', 'bsc', 'polygon'];

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const { connect, disconnect, chainId, isActive, account, shouldDisable } = useMetaMask()

  const switchNetwork = async (chainName) => {
    const hexChainId = '0x' + supportedNetworks[networks.indexOf(chainName)].toString(16);
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: hexChainId }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: hexChainId,
                chainName: chainName,
                rpcUrls: [getRpcUrl(hexChainId)],
              },
            ],
          });
        } catch (addError) {
          // handle "add" error
        }
      }
      // handle other "switch" errors
    } finally {
      setShowModal(false)
    }
  }

  useEffect(() => {
    if (account) setShowModal(false);
    if (chainId !== undefined && supportedNetworks.indexOf(chainId) === -1) {
      switchNetwork(networks[0]);
    }
  }, [account, chainId]);

  const displayAddress = (address) => {
    return `${address.substr(0, 4)}...${address.substr(39, 42)}`;
  };

  const logout = () => {
    setShowInfo(false);
  };
  return (
    <>
      <div>
        <header className="bg-black border-b-default border-white border-opacity-50 py-5 md:py-0">
          <div className="flex  items-center justify-between w-10/12 mx-auto gap-3 md:gap-0">

            <div className="logo text-center h-20 hidden md:flex items-center justify-center gap-20 md:flex-1">
              <button
                type="button"
                className="text-white border-1 px-8 py-1 rounded-xl border-green-rasta"
                onClick={() => setShowModal(true)}
              >
                Switch Network
              </button>
            </div>
            <div className="right-cta items-center flex flex-row md:flex-1 md:justify-end">
              {!isActive ? (
                <button
                  type="button"
                  className="text-white border-1 px-8 py-1 rounded-xl border-green-rasta"
                  onClick={() => connect()}
                >
                  Connect
                </button>
              ) : (
                <button
                  type="button"
                  className="text-white border-1 px-8 py-1 rounded-xl border-green-rasta"
                  onClick={() => setShowInfo(true)}
                >
                  {displayAddress(account)}
                </button>
              )}
            </div>
          </div>
        </header>
        {showModal ? (
          <>
            <div className="text-white justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-full md:w-1/3 my-6 mx-auto max-w-3xl">
                {/* content */}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-rasta pb-8 outline-none focus:outline-none">
                  {/* header */}
                  <div className="flex items-start justify-between p-5 border-b-1 border-solid border-gray-100 rounded-t ">
                    <h3 className="text-3xl font-semibold">
                      Switch Network
                    </h3>
                    <button
                      type="button"
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-white opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/* body */}
                  <div className="relative p-6 flex">
                    <div className="grid grid-cols-2 md:grid-cols-3 mx-auto gap-4">
                      {networks.map((item, index) => {
                        return (
                          <span
                            className="wallet-wrap flex flex-col space-y-3 bg-gray-inBlack px-2 py-4 rounded-xl items-center cursor-pointer"
                            onClick={(e) => switchNetwork(item)}
                            key={index}
                          >
                            <span>
                              <img src={index === 0 ? EtherIcon : (index === 1 ? BscIcon : PolygonIcon)} alt="icon" />
                            </span>
                            <span>{item.toUpperCase()}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black" />
          </>
        ) : null}
        {showInfo && (
          <>
            <div className="text-white justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-full md:w-1/3 my-6 mx-auto max-w-3xl">
                {/* content */}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-rasta pb-3 outline-none focus:outline-none">
                  {/* header */}
                  <div className="flex items-start justify-between p-5 border-b-1 border-solid border-gray-100 rounded-t ">
                    <h3 className="text-3xl font-semibold">Your Wallet</h3>
                    <button
                      type="button"
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowInfo(false)}
                    >
                      <span className="bg-transparent text-white opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/* body */}
                  <div className="relative p-6 flex justify-center font-bold text-xl">
                    {account}
                  </div>
                  <div className="relative flex px-4 text-red-rasta">
                    <a
                      className="flex items-center flex-row hover:underline font-bold text-md"
                      href={`https://bscscan.com/address/${account}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View on BscScan&nbsp;
                      <FaIcons.FaShareSquare className="text-red-rasta" />
                    </a>
                  </div>
                  <div className="relative p-3 flex justify-center font-bold">
                    <button
                      type="button"
                      className="px-8 py-2 rounded-xl border-red-rasta border-2  font-bold text-red-rasta"
                      onClick={() => logout()}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black" />
          </>
        )}
      </div>
    </>
  );
}
