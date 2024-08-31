class MinHeap {
	constructor() {
		this.heap_array = [];
	}
	size() {
		return this.heap_array.length;
	}
	empty() {
		return (this.size() === 0);
	}
	push(value) {
		this.heap_array.push(value);
		this.up_heapify();
	}
	up_heapify() {
		var current_index = this.size() - 1;
		while (current_index > 0) {
			var current_element = this.heap_array[current_index];
			var parent_index = Math.trunc((current_index - 1) / 2);
			var parent_element = this.heap_array[parent_index];

			if (parent_element[0] < current_element[0]) {
				break;
			}
			else {
				this.heap_array[parent_index] = current_element;
				this.heap_array[current_index] = parent_element;
				current_index = parent_index;
			}
		}
	}
	top() {
		return this.heap_array[0];
	}
	pop() {
		if (this.empty() == false) {
			var last_index = this.size() - 1;
			this.heap_array[0] = this.heap_array[last_index];
			this.heap_array.pop();
			this.down_heapify();
		}
	}
	down_heapify() {
		var current_index = 0;
		var current_element = this.heap_array[0];
		while (current_index < this.size()) {
			var child_index1 = (current_index * 2) + 1;
			var child_index2 = (current_index * 2) + 2;
			if (child_index1 >= this.size() && child_index2 >= this.size()) {
				break;
			}
			else if (child_index2 >= this.size()) {
				let child_element1 = this.heap_array[child_index1];
				if (current_element[0] < child_element1[0]) {
					break;
				}
				else {
					this.heap_array[child_index1] = current_element;
					this.heap_array[current_index] = child_element1;
					current_index = child_index1;
				}
			}
			else {
				var child_element1 = this.heap_array[child_index1];
				var child_element2 = this.heap_array[child_index2];
				if (current_element[0] < child_element1[0] && current_element[0] < child_element2[0]) {
					break;
				}
				else {
					if (child_element1[0] < child_element2[0]) {
						this.heap_array[child_index1] = current_element;
						this.heap_array[current_index] = child_element1;
						current_index = child_index1;
					}
					else {
						this.heap_array[child_index2] = current_element;
						this.heap_array[current_index] = child_element2;
						current_index = child_index2;
					}
				}
			}
		}
	}
}

class AES {
    constructor(key) {
        if (!key || key.length !== 16) {
            throw new Error("Key must be a 16-character string.");
        }
        this.key = this._stringToWordArray(key);
        this.rounds = 10; // AES-128 has 10 rounds
        this.sbox = this._generateSBox();
        this.invSbox = this._generateInvSBox();
        this.rcon = this._generateRcon();
        this.keySchedule = this._keyExpansion();
    }

    _stringToWordArray(str) {
        let words = [];
        for (let i = 0; i < str.length; i += 4) {
            words.push(
                (str.charCodeAt(i) << 24) |
                (str.charCodeAt(i + 1) << 16) |
                (str.charCodeAt(i + 2) << 8) |
                str.charCodeAt(i + 3)
            );
        }
        return words;
    }

    _wordArrayToString(words) {
        let str = '';
        for (let i = 0; i < words.length; i++) {
            str += String.fromCharCode(
                (words[i] >>> 24) & 0xff,
                (words[i] >>> 16) & 0xff,
                (words[i] >>> 8) & 0xff,
                words[i] & 0xff
            );
        }
        return str;
    }

    _generateSBox() {
        const sbox = new Array(256);
        let p = 1, q = 1;

        // Loop invariant: p * q == 1 in the Galois field
        do {
            // Multiply p by 3
            p = p ^ (p << 1) ^ ((p & 0x80) ? 0x1B : 0);
            p &= 0xFF;

            // Divide q by 3 (equals multiplying by inverse of 3)
            q ^= (q << 1);
            q ^= (q << 2);
            q ^= (q << 4);
            q ^= ((q & 0x80) ? 0x09 : 0);
            q &= 0xFF;

            // Compute the affine transformation
            const xformed = q ^ (q << 1) ^ (q << 2) ^ (q << 3) ^ (q << 4);
            sbox[p] = (xformed ^ 0x63) & 0xFF;
        } while (p !== 1);

        // 0 is a special case since 0 has no inverse
        sbox[0] = 0x63;
        return sbox;
    }

    _generateInvSBox() {
        const invSbox = new Array(256);
        for (let i = 0; i < 256; i++) {
            invSbox[this.sbox[i]] = i;
        }
        return invSbox;
    }

    _generateRcon() {
        const rcon = [0x01000000];
        for (let i = 1; i < 10; i++) {
            rcon[i] = (rcon[i - 1] << 1) ^ ((rcon[i - 1] & 0x80000000) ? 0x1b000000 : 0);
        }
        return rcon;
    }

    _keyExpansion() {
        const key = this.key.slice();
        for (let i = 4; i < 4 * (this.rounds + 1); i++) {
            let temp = key[i - 1];
            if (i % 4 === 0) {
                temp = this._subWord(this._rotWord(temp)) ^ this.rcon[(i / 4) - 1];
            }
            key[i] = key[i - 4] ^ temp;
        }
        return key;
    }

    _subWord(word) {
        return (
            (this.sbox[(word >>> 24) & 0xFF] << 24) |
            (this.sbox[(word >>> 16) & 0xFF] << 16) |
            (this.sbox[(word >>> 8) & 0xFF] << 8) |
            this.sbox[word & 0xFF]
        );
    }

    _rotWord(word) {
        return ((word << 8) | (word >>> 24)) & 0xFFFFFFFF;
    }

    _addRoundKey(state, round) {
        for (let i = 0; i < 4; i++) {
            state[i] ^= this.keySchedule[round * 4 + i];
        }
    }

    _subBytes(state) {
        for (let i = 0; i < 4; i++) {
            state[i] = (
                (this.sbox[(state[i] >>> 24) & 0xFF] << 24) |
                (this.sbox[(state[i] >>> 16) & 0xFF] << 16) |
                (this.sbox[(state[i] >>> 8) & 0xFF] << 8) |
                this.sbox[state[i] & 0xFF]
            );
        }
    }

    _invSubBytes(state) {
        for (let i = 0; i < 4; i++) {
            state[i] = (
                (this.invSbox[(state[i] >>> 24) & 0xFF] << 24) |
                (this.invSbox[(state[i] >>> 16) & 0xFF] << 16) |
                (this.invSbox[(state[i] >>> 8) & 0xFF] << 8) |
                this.invSbox[state[i] & 0xFF]
            );
        }
    }

    _shiftRows(state) {
        state[1] = (state[1] << 8) | (state[1] >>> 24); // 1-byte left shift
        state[2] = (state[2] << 16) | (state[2] >>> 16); // 2-byte left shift
        state[3] = (state[3] << 24) | (state[3] >>> 8); // 3-byte left shift
    }

    _invShiftRows(state) {
        state[1] = (state[1] >>> 8) | (state[1] << 24); // 1-byte right shift
        state[2] = (state[2] >>> 16) | (state[2] << 16); // 2-byte right shift
        state[3] = (state[3] >>> 24) | (state[3] << 8); // 3-byte right shift
    }

    _mixColumns(state) {
        for (let i = 0; i < 4; i++) {
            let a = state[i];
            let a0 = (a >>> 24) & 0xFF;
            let a1 = (a >>> 16) & 0xFF;
            let a2 = (a >>> 8) & 0xFF;
            let a3 = a & 0xFF;

            state[i] = (this._galoisMult(a0, 2) ^ this._galoisMult(a1, 3) ^ a2 ^ a3) << 24 |
                (a0 ^ this._galoisMult(a1, 2) ^ this._galoisMult(a2, 3) ^ a3) << 16 |
                (a0 ^ a1 ^ this._galoisMult(a2, 2) ^ this._galoisMult(a3, 3)) << 8 |
                (this._galoisMult(a0, 3) ^ a1 ^ a2 ^ this._galoisMult(a3, 2));
        }
    }

    _invMixColumns(state) {
        for (let i = 0; i < 4; i++) {
            let a = state[i];
            let a0 = (a >>> 24) & 0xFF;
            let a1 = (a >>> 16) & 0xFF;
            let a2 = (a >>> 8) & 0xFF;
            let a3 = a & 0xFF;

            state[i] = (this._galoisMult(a0, 0x0e) ^ this._galoisMult(a1, 0x0b) ^ this._galoisMult(a2, 0x0d) ^ this._galoisMult(a3, 0x09)) << 24 |
                (this._galoisMult(a0, 0x09) ^ this._galoisMult(a1, 0x0e) ^ this._galoisMult(a2, 0x0b) ^ this._galoisMult(a3, 0x0d)) << 16 |
                (this._galoisMult(a0, 0x0d) ^ this._galoisMult(a1, 0x09) ^ this._galoisMult(a2, 0x0e) ^ this._galoisMult(a3, 0x0b)) << 8 |
                (this._galoisMult(a0, 0x0b) ^ this._galoisMult(a1, 0x0d) ^ this._galoisMult(a2, 0x09) ^ this._galoisMult(a3, 0x0e));
        }
    }

    _galoisMult(a, b) {
        let p = 0;
        for (let counter = 0; counter < 8; counter++) {
            if (b & 1) p ^= a;
            let hiBitSet = a & 0x80;
            a = (a << 1) & 0xff;
            if (hiBitSet) a ^= 0x1b;
            b >>= 1;
        }
        return p;
    }

    _pad(data) {
        const blockSize = 16;
        const padding = blockSize - (data.length % blockSize);
        return data + String.fromCharCode(padding).repeat(padding);
    }

    _unpad(data) {
        const padding = data.charCodeAt(data.length - 1);
        return data.slice(0, -padding);
    }

    _cipher(input) {
        let state = input.slice();
        this._addRoundKey(state, 0);

        for (let round = 1; round < this.rounds; round++) {
            this._subBytes(state);
            this._shiftRows(state);
            this._mixColumns(state);
            this._addRoundKey(state, round);
        }

        this._subBytes(state);
        this._shiftRows(state);
        this._addRoundKey(state, this.rounds);

        return state;
    }

    _invCipher(input) {
        let state = input.slice();
        this._addRoundKey(state, this.rounds);

        for (let round = this.rounds - 1; round > 0; round--) {
            this._invShiftRows(state);
            this._invSubBytes(state);
            this._addRoundKey(state, round);
            this._invMixColumns(state);
        }

        this._invShiftRows(state);
        this._invSubBytes(state);
        this._addRoundKey(state, 0);

        return state;
    }

    encrypt(plaintext) {
        const padded = this._pad(plaintext);
        let encrypted = [];
        for (let i = 0; i < padded.length; i += 16) {
            const block = this._stringToWordArray(padded.slice(i, i + 16));
            const cipherBlock = this._cipher(block);
            encrypted = encrypted.concat(cipherBlock);
        }
        return this._wordArrayToString(encrypted);
    }

    decrypt(ciphertext) {
        let decrypted = [];
        for (let i = 0; i < ciphertext.length; i += 16) {
            const block = this._stringToWordArray(ciphertext.slice(i, i + 16));
            const plainBlock = this._invCipher(block);
            decrypted = decrypted.concat(plainBlock);
        }
        return this._unpad(this._wordArrayToString(decrypted));
    }
}


// uncomment this if you want to use cryptjs library for aes and replace the object below

// class Encryption {
// 	encrypt(data) {
// 	  return CryptoJS.AES.encrypt(data, "secret-key").toString();
// 	}
  
// 	decrypt(data) {
// 	  let bytes = CryptoJS.AES.decrypt(data, "secret-key");
// 	  return bytes.toString(CryptoJS.enc.Utf8);
// 	}
// }

class Codec {
	getCodes(node, curr_code) {
		if (typeof (node[1]) === "string") {
			this.codes[node[1]] = curr_code;
			return;
		}
		this.getCodes(node[1][0], curr_code + '0');
		this.getCodes(node[1][1], curr_code + '1');
	}
	make_string(node) {
		if (typeof (node[1]) === "string") {
			return "'" + node[1];
		}
		return '0' + this.make_string(node[1][0]) + '1' + this.make_string(node[1][1]);
	}
	make_tree(tree_string) {
		let node = [];
		if (tree_string[this.index] === "'") {
			this.index++;
			node.push(tree_string[this.index]);
			this.index++;
			return node;
		}
		this.index++;
		node.push(this.make_tree(tree_string));
		this.index++;
		node.push(this.make_tree(tree_string));
		return node;
	}
	encode(data) {
		this.heap = new MinHeap();

		var mp = new Map();
		for (let i = 0; i < data.length; i++) {
			if (mp.has(data[i])) {
				let foo = mp.get(data[i]);
				mp.set(data[i], foo + 1);
			}
			else {
				mp.set(data[i], 1);
			}
		}
		if (mp.size === 0) {
			let final_string = "zer#";
			
			let output_message = "Compression complete and file will be downloaded automatically." + '\n' + "Compression Ratio : " + (data.length / final_string.length).toPrecision(6);
			return [final_string, output_message];
		}

		if (mp.size === 1) {
			let key, value;
			for (let [k, v] of mp) {
				key = k;
				value = v;
			}
			let final_string = "one" + '#' + key + '#' + value.toString();
			let output_message = "Compression complete and file will be downloaded automatically." + '\n' + "Compression Ratio : " + (data.length / final_string.length).toPrecision(6);
			return [final_string, output_message];
		}
		for (let [key, value] of mp) {
			this.heap.push([value, key]);
		}
		while (this.heap.size() >= 2) {
			let min_node1 = this.heap.top();
			this.heap.pop();
			let min_node2 = this.heap.top();
			this.heap.pop();
			this.heap.push([min_node1[0] + min_node2[0], [min_node1, min_node2]]);
		}
		var huffman_tree = this.heap.top();
		this.heap.pop();
		this.codes = {};
		this.getCodes(huffman_tree, "");

		/// convert data into coded data
		let binary_string = "";
		for (let i = 0; i < data.length; i++) {
			binary_string += this.codes[data[i]];
		}
		let padding_length = (8 - (binary_string.length % 8)) % 8;
		for (let i = 0; i < padding_length; i++) {
			binary_string += '0';
		}
		let encoded_data = "";
		for (let i = 0; i < binary_string.length;) {
			let curr_num = 0;
			for (let j = 0; j < 8; j++, i++) {
				curr_num *= 2;
				curr_num += binary_string[i] - '0';
			}
			encoded_data += String.fromCharCode(curr_num);
		}
		let tree_string = this.make_string(huffman_tree);
		let ts_length = tree_string.length;
		let final_string = ts_length.toString() + '#' + padding_length.toString() + '#' + tree_string + encoded_data;
		let output_message = "Compression complete and file will be downloaded automatically." + '\n' + "Compression Ratio : " + (data.length / final_string.length).toPrecision(6);
		return [final_string, output_message];
	}  

	decode(data) {
		let k = 0;
		let temp = "";
		while (k < data.length && data[k] != '#') {
			temp += data[k];
			k++;
		}
		if (k == data.length){
			alert("Invalid File! Please submit a valid De-Compressed file");
			location.reload();
			return;
		}
		if (temp === "zer") {
			let decoded_data = "";
			let output_message = "De-Compression complete and file will be downloaded automatically.";
			return [decoded_data, output_message];
		}
		if (temp === "one") {
			data = data.slice(k + 1);
			k = 0;
			temp = "";
			while (data[k] != '#') {
				temp += data[k];
				k++;
			}
			let one_char = temp;
			data = data.slice(k + 1);
			let str_len = parseInt(data);
			let decoded_data = "";
			for (let i = 0; i < str_len; i++) {
				decoded_data += one_char;
			}
			let output_message = "De-Compression complete and file will be downloaded automatically.";
			return [decoded_data, output_message];

		}
		data = data.slice(k + 1);
		let ts_length = parseInt(temp);
		k = 0;
		temp = "";
		while (data[k] != '#') {
			temp += data[k];
			k++;
		}
		data = data.slice(k + 1);
		let padding_length = parseInt(temp);
		temp = "";
		for (k = 0; k < ts_length; k++) {
			temp += data[k];
		}
		data = data.slice(k);
		let tree_string = temp;
		temp = "";
		for (k = 0; k < data.length; k++) {
			temp += data[k];
		}
		let encoded_data = temp;
		this.index = 0;
		var huffman_tree = this.make_tree(tree_string);

		let binary_string = "";
		for (let i = 0; i < encoded_data.length; i++) {
			let curr_num = encoded_data.charCodeAt(i);
			let curr_binary = "";
			for (let j = 7; j >= 0; j--) {
				let foo = curr_num >> j;
				curr_binary = curr_binary + (foo & 1);
			}
			binary_string += curr_binary;
		}
		binary_string = binary_string.slice(0, -padding_length);
		let decoded_data = "";
		let node = huffman_tree;
		for (let i = 0; i < binary_string.length; i++) {
			if (binary_string[i] === '1') {
				node = node[1];
			}
			else {
				node = node[0];
			}

			if (typeof (node[0]) === "string") {
				decoded_data += node[0];
				node = huffman_tree;
			}
		}
		let output_message = "De-Compression complete and file will be downloaded automatically.";
		return [decoded_data, output_message];
	}
}

window.onload = function () {
    const decodeBtn = document.getElementById("decode");
    const encodeBtn = document.getElementById("encode");
    const encryptBtn = document.getElementById("encrypt");
    const decryptBtn = document.getElementById("decrypt");
    const compressEncryptBtn = document.getElementById("compressEncrypt");
    const decryptDecompressBtn = document.getElementById("decryptDecompress");
    const uploadFile = document.getElementById("uploadfile");
    const submitBtn = document.getElementById("submitbtn");
    const step1 = document.getElementById("step1");
    const step2 = document.getElementById("step2");
    const step3 = document.getElementById("step3");
    const codecObj = new Codec();
    // const encryptionObj = new Encryption();
    const key = "1234567890123456" // 16 characters must for AES-128
    const aesobj = new AES(key); 

    submitBtn.onclick = function () {
        var uploadedFile = uploadFile.files[0];
        if (uploadedFile === undefined) {
            alert("No file uploaded.\nPlease upload a file and try again");
            return;
        }
        let nameSplit = uploadedFile.name.split('.');
        var extension = nameSplit[nameSplit.length - 1].toLowerCase();
        if (extension != "txt") {
            alert("Invalid file type (." + extension + ") \nPlease upload a valid .txt file and try again");
            return;
        }
        document.getElementById("step1").style.display = "none";
        document.getElementById("step2").style.display = "inline-flex";
        document.getElementById("startagain").style.visibility = "visible";
    }

    encodeBtn.onclick = function () {
        handleFileOperation(codecObj.encode.bind(codecObj), "compressed", "Compressing your file ...\n", "Compressed");
    }

    decodeBtn.onclick = function () {
        handleFileOperation(codecObj.decode.bind(codecObj), "decompressed", "De-compressing your file ...\n", "De-Compressed");
    }

    encryptBtn.onclick = function () {
        handleFileOperation((data) => {
            let result = aesobj.encrypt(data);
            return [result, "File encrypted successfully."];
        }, "encrypted", "Encrypting your file ...\n", "Encrypted");
    }

    decryptBtn.onclick = function () {
        handleFileOperation((data) => {
            let result = aesobj.decrypt(data);
            return [result, "File Decrypted Successfully."];
        }, "decrypted", "Decrypting your file ...\n", "Decrypted");
    }

    compressEncryptBtn.onclick = function () {
        handleFileOperation((data) => {
            let [compressedData, compressMsg] = codecObj.encode(data);
            let encryptedData = aesobj.encrypt(compressedData);
            return [encryptedData, "File compressed and encrypted successfully."];
        }, "compressed_encrypted", "Compressing and Encrypting your file...\n", "Compressed and Encrypted");
    }

    decryptDecompressBtn.onclick = function () {
        handleFileOperation((data) => {
            let decryptedData = aesobj.decrypt(data);
            let [decompressedData, decompressMsg] = codecObj.decode(decryptedData);
            return [decompressedData, "File decrypted and decompressed successfully."];
        }, "decrypted_decompressed", "Decrypting and Decompressing your file...\n", "Decrypted and Decompressed");
    }

    function handleFileOperation(operation, operationType, secMsg, word) {
        var uploadedFile = uploadFile.files[0];
        if (uploadedFile === undefined) {
            alert(`No file uploaded.\nPlease upload a file and try again!`);
            return;
        }
        onclickChanges2(secMsg, word);
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            let text = fileLoadedEvent.target.result;
            let [processedData, outputMsg] = operation(text);
            myDownloadFile(`${uploadedFile.name.split('.')[0]}_${operationType}.txt`, processedData);
            ondownloadChanges(outputMsg);
        }
        fileReader.readAsText(uploadedFile, "UTF-8");
        document.getElementById("step2").style.display = "none";
        document.getElementById("step3").style.display = "inline-flex";
    }

    function onclickChanges2(secMsg, word) {
        decodeBtn.disabled = true;
        encodeBtn.disabled = true;
        encryptBtn.disabled = true;
        decryptBtn.disabled = true;
        compressEncryptBtn.disabled = true;
        decryptDecompressBtn.disabled = true;
        step3.innerHTML = "";
        let msg2 = document.createElement("span");
        msg2.className = "text2";
        msg2.innerHTML = secMsg;
        step3.appendChild(msg2);
        let msg3 = document.createElement("span");
        msg3.className = "text2";
        msg3.innerHTML = word + " file will be downloaded automatically!";
        step3.appendChild(msg3);
    }

    function myDownloadFile(fileName, text) {
        let a = document.createElement('a');
        a.href = "data:application/octet-stream," + encodeURIComponent(text);
        a.download = fileName;
        a.click();
    }

    function ondownloadChanges(outputMsg) {
        step3.innerHTML = "";
        let img = document.createElement("img");
        img.src = "done.jpg";
        img.id = "doneImg";
        step3.appendChild(img);
        var br = document.createElement("br");
        step3.appendChild(br);
        let msg3 = document.createElement("span");
        msg3.className = "text2";
        msg3.innerHTML = outputMsg;
        step3.appendChild(msg3);
    }
}
