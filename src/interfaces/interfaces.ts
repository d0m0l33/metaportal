import { Interface } from "ethers/lib/utils"
import ERC1155 from "../abi/ERC1155.json"

import VISORS from "../abi/Visors.json"


const ERC1155Interface = new Interface(ERC1155.abi);
const VISORSInterface = new Interface(VISORS.abi)

export { ERC1155, ERC1155Interface }

export { VISORS, VISORSInterface }

