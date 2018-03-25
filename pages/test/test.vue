<template>
    <div>
        <h2>web3 연동 테스트 페이지</h2>
    </div>
</template>

<script>

export default {

    created () {

    },
    mounted () {
        // 1. metamask가 있으면 web3를 바로 사용가능.
        // 2. 없다면 Web3로 이더네트워크를 직접 연결해야 함.
        // 3. web3가 undefined면 정상적인 동작이 불가능 하다고 알림 띄울 것!

        let ABI =[
            {
                "constant": true,
                "inputs": [],
                "name": "get",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "x",
                        "type": "uint256"
                    }
                ],
                "name": "set",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ]
        var CoursetroContract = web3.eth.contract(ABI);
        console.log(CoursetroContract)
        let Cursetro = CoursetroContract.at('0x7b1a3f9c8bc99f282faf4dff34bd025bbe266a53')
        Cursetro.get((e, r)=> {
            console.log(e)
            console.log(r)
            console.log('tetetetetettet')
//            Cursetro.set(1, function(e, r) {
                console.log(e)
                console.log(r)
                web3.eth.getBalance('0x6eefB0eA4bc438c71C2bd8F6B01eDBC759Bae45c', (e, r) => {
                    console.log(e)
                    console.log(r)
                })
//            })
        })


    }

}
</script>


<style scoped>

</style>   