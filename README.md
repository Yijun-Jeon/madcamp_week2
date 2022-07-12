# <img src="https://user-images.githubusercontent.com/68576681/177258571-64e4855d-bdca-4335-b221-e23d54708cbe.jpg" width="30" height="30"> 몰켓몬스터
> 2분반 1주차(2022.07.06~07.12) By 전이준, 최동원
# Table Of Contents
* [Project Summary](#project-summary)
* [Developer Information](#developer-information)
* [Development Environment](#development-environment)
* [Application Information](#application-information)
  * [0. Login & SignUp](#0-login--signup)
  * [1. Tab1 - Contact](#1-tab1---contact)
  * [2. Tab2 - Gallery](#2-tab2---gallery)
  * [3. Tab3 - Direct Message](#3-tab3---direct-message)
  * [4. Future Work(언젠가)](#4-future-work언젠가)
***

# Project Summary
* 포켓몬스터 주제의 1대1 게임 어플리케이션입니다
* 데이터베이스에서 사용자의 고유한 정보를 불러와 로그인 할 수 있습니다.
* 카카오톡 계정을 연동하여 데이터베이스에 저장할 수 있습니다.
* 각 포켓몬별 포켓몬스터 공식 상성과 스킬을 사용합니다.
* soket을 통해 게임 내에서 서로간에 1대1 정보 교환을 할 수 있습니다.
***

# Developer Information
* [전이준](https://github.com/Yijun-Jeon) (성균관대학교 글로벌경영학과) 
* [최동원](https://github.com/chlehdwon) (KAIST 전기및전자공학부) 
***

# Development Environment
* OS: Android & IOS
* Language: JavaSkript
* Framework: React Native
* Server: Node.js
* Database: MySQL
* Target Device: All device
***

# Application Information
## 0. Loding & Login & SignUp

<img src="https://user-images.githubusercontent.com/68576681/177273659-f9427d7f-33de-47d6-9ed2-6c4a791f6416.gif" width="200" height="400">  <img src="https://user-images.githubusercontent.com/68576681/177275755-e7c8f0ad-66c0-4bc3-b695-47066ea39029.jpg" width="200" height="400">  <img src="https://user-images.githubusercontent.com/68576681/177275760-c971c2db-e492-48c9-afd7-e67f9eafae38.jpg" width="200" height="400">
### Major Features
* 이미지 데이터를 미리 받아오는 동안 로딩 이미지가 표시됩니다.
* 이메일과 비밀번호를 입력받아 데이터 베이스의 사용자 정보와 비교흫 통해 로그인을 할 수 있습니다
* 계정이 없을 시, SignUp을 통해 계정을 생성하여 데이터베이스에 저장할 수 있습니다.
* 카카오 로그인을 누르면 카카오톡과 연동이 되어 카카오 계정 정보 또한 데이터베이스에 저장됩니다.
* 인증된 사용자가 아닌 경우 로그인이 불가능합니다.

### Technology Used
* MySQL 를 사용하여 모든 유저들의 정보를 서버에 저장해놓았습니다
* 따라서 다른 기기에서도 동일한 ID로 로그인 할 수 있습니다
<img src="https://user-images.githubusercontent.com/68576681/177285926-a6c1b166-fa71-46ab-b383-7c00b57a0018.png" height="400">

## 1. RoomScreen

<img src="https://user-images.githubusercontent.com/68576681/177273675-c6d1120a-2c9f-4ebc-a1ac-f01f4c3a6b2f.gif" width="200" height="400">  <img src="https://user-images.githubusercontent.com/68576681/177277727-53a7753e-7cbe-4dd7-89c3-b4389ec81eac.jpg" width="200" height="400">  <img src="https://user-images.githubusercontent.com/68576681/177277729-40e3eee9-9d14-4c35-bf74-8bb32100a94b.jpg" width="200" height="400">  <img src="https://user-images.githubusercontent.com/68576681/177277735-9118e859-c626-4971-b0d5-b966ea07ce7b.jpg" width="200" height="400"> 
### Major Features
* 로그인 화면에서 사용자의 이름을 받아 유저 이름을 띄워 줍니다.
* Exit 이미지 버튼을 누르면 로그인 화면으로 돌아가게 됩니다
* CREATE ROOM 버튼으로 6자리 랜덤 숫자 코드를 가지는 방을 생성할 수 있습니다.
* 코드를 입력하고 JOIN ROOM 버튼으로 특정 코드의 방으로 들어갈 수 있습니다.
  * 코드는 항상 6자리 숫자로, 다른 형식의 코드를 입력하면 Join이 불가능합니다.
  
### Technology Used
* Navigation을 사용해 스크린 간에 전환을 할 수 있습니다.
* Navigate로 전달한 정보를 route로 받아서 사용할 수 있습니다.
* TouchableOpacity로 이미지 자체를 클릭하여 이벤트 핸들링을 할 수 있게 했습니다.

## 2. SelectScreen

<img src="https://user-images.githubusercontent.com/68576681/177276000-107f4dfc-96c5-4ac8-b19d-7333732a7ed4.gif" width="200" height="400">  <img src="https://user-images.githubusercontent.com/68576681/177277676-1e837306-c43c-4305-a5bd-d5d8fca9aedf.jpg" width="200" height="400"> <img src="https://user-images.githubusercontent.com/68576681/177277682-dd60dac1-7654-4e10-a5f4-90a5f91bb9ae.jpg" width="200" height="400">  <img src="https://user-images.githubusercontent.com/68576681/177277684-f33ba12b-7e3d-4b5b-8509-39c6c7353089.jpg" width="200" height="400"> 
### Major Features
* 5가지 포켓몬 중에서 플레이 할 포켓몬을 정합니다.
  * 특정 포켓몬 색깔에 따라 고유 색깔이 정해집니다.
  * 포켓몬에 따라 기본 체력, 상성이 상이하여 게임 진행에 영향을 줍니다.

### Technology Used
* useState로 초기 색깔을 지정해주고 포켓몬 선택에 따라 상태를 바꾸어 줍니다.
* gif 이미지를 통해 움직이는 포켓몬을 구현하였습니다.

## 3. BattleScreen

<img src="https://user-images.githubusercontent.com/68576681/177273474-0471dd5e-8ff1-4517-a97a-fd411e3ca207.gif" width="200" height="400">  <img src="https://user-images.githubusercontent.com/68576681/177282112-314a298b-bab5-4e2c-a8e0-4e1931dcd22a.jpg" width="200" height="400">  <img src="https://user-images.githubusercontent.com/68576681/177282173-30249241-e273-4e48-87df-c7db7cb140a4.jpg" width="200" height="400">  <img src="https://user-images.githubusercontent.com/68576681/177283677-ae249225-5ed3-4374-a847-c2e4e9edbad8.PNG" width="200" height="400">

### Major Features
* 같은 방 코드에 상대방이 입장할 때까지 기다립니다.
  * 상대방이 입장을 하면 게임이 시작이 되고 방 생성 유저에게 턴이 주어집니다.
  * 각 플레이어가 선택한 포켓몬과 현재 체력/최대 체력, 공격 증가율/방어 증가율이 표현됩니다.
* 턴은 각 플레이어의 매 선택마다 상대방에게 넘어가게 됩니다.
  * 자신의 턴이 아닐 때에는 버튼이 비활성화되고 상대방의 선택을 기다립니다.
* 모든 스킬의 데미지는 스킬 타입과 상대 포켓몬의 타입에 따라 변화합니다.
  * 상성이 우세한 경우에는 2배의 데미지가 적용됩니다.
  * 상성이 없을 경우에는 1배의 데미지가 적용됩니다.
  * 상성이 열세한 경우에는 0.5배의 데미지가 적용됩니다.
  * 공격으로 상대방의 체력을 감소시킨 경우에 깜빡이는 효과로 피격을 표현합니다.
* 버프, 디버프 스킬로 상대방의 공격력과 방어력을 감소시킬 수 있습니다.
* 현재 체력이 0 이하로 되면 게임 종료가 되고 승패가 결정됩니다.

### Technology Used
* Recycler View를 이용해 사용자 정보를 보여줍니다
* Firebase를 통해 사용자들이 보낸 메세지들을 서버에 모두 저장합니다
* senderID와 userID를 통해 각 사용자에 해당하는 메세지들을 받아올 수 있습니다
* ValueEventListener을 통해 변경사항이 생길 시 창을 업데이트 해줍니다
<img src="https://user-images.githubusercontent.com/68576681/177285932-e0970a50-c7d5-4964-8d1a-18ad9e2a59d8.png" height="400">

## 4.EndScreen

<img src="https://user-images.githubusercontent.com/68576681/177273474-0471dd5e-8ff1-4517-a97a-fd411e3ca207.gif" width="200" height="400">  <img src="https://user-images.githubusercontent.com/68576681/177282112-314a298b-bab5-4e2c-a8e0-4e1931dcd22a.jpg" width="200" height="400">  <img src="https://user-images.githubusercontent.com/68576681/177282173-30249241-e273-4e48-87df-c7db7cb140a4.jpg" width="200" height="400">  <img src="https://user-images.githubusercontent.com/68576681/177283677-ae249225-5ed3-4374-a847-c2e4e9edbad8.PNG" width="200" height="400">

### Major Features
* 게임 결과 따라 Win, Lose가 결정됩니다.
* Restart 버튼을 누르면 RoomScreen으로 돌아가서 다시 방을 생성할 수 있습니다.

### Technology Used
* senderID와 userID를 통해 각 사용자에 해당하는 메세지들을 받아올 수 있습니다
* ValueEventListener을 통해 변경사항이 생길 시 창을 업데이트 해줍니다
<img src="https://user-images.githubusercontent.com/68576681/177285932-e0970a50-c7d5-4964-8d1a-18ad9e2a59d8.png" height="400">


## 5. Future Work(언젠가)
* 사용자의 전적 정보를 데이터베이스에 저장하여 불러올 수 있게 할 예정입니다.
* RoomScreen에서 채팅기능을 구현하여 모든 사용자 간에 공유되는 채팅을 구현할 예정입니다.
 * 방 생성시 생성된 코드가 자동으로 채팅창에 전달이 되어 모르는 사용자 간에도 게임 참여가 가능하게 할 예정입니다.
* RoomSceen에서 Tab을 추가하여 현재 진행되는 특정 코드의 방의 게임을 관전할 수 있게 할 예정입니다.
