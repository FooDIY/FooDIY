/**
 * Created by Sehyeon on 2017-07-31.
 */
function jusoCallBack(roadFullAddr,roadAddrPart1,addrDetail,roadAddrPart2,engAddr,jibunAddr,zipNo,admCd,rnMgtSn,bdMgtSn,detBdNmList,bdNm,bdKdcd,siNm,sggNm,emdNm,liNm,rn,udrtYn,buldMnnm,buldSlno,mtYn,lnbrMnnm,lnbrSlno,emdNo,entX,entY){
    document.getElementById('roadFullAddr').value = roadFullAddr;
    document.getElementById('roadAddrPart1').value = roadAddrPart1;
    document.getElementById('addrDetail').value = addrDetail;
    document.getElementById('roadAddrPart2').value = roadAddrPart2;
    document.getElementById('engAddr').value = engAddr;
    document.getElementById('jibunAddr').value = jibunAddr;
    document.getElementById('zipNo').value = zipNo;
    document.getElementById('admCd').value = admCd;
    document.getElementById('rnMgtSn').value = rnMgtSn;
    document.getElementById('bdMgtSn').value = bdMgtSn;
    document.getElementById('detBdNmList').value = detBdNmList;
    document.getElementById('bdNm').value = bdNm;
    document.getElementById('bdKdcd').value = bdKdcd;
    document.getElementById('siNm').value = siNm;
    document.getElementById('sggNm').value = sggNm;
    document.getElementById('emdNm').value = emdNm;
    document.getElementById('liNm').value = liNm;
    document.getElementById('rn').value = rn;
    document.getElementById('udrtYn').value = udrtYn;
    document.getElementById('buldMnnm').value = buldMnnm;
    document.getElementById('buldSlno').value = buldSlno;
    document.getElementById('mtYn').value = mtYn;
    document.getElementById('lnbrMnnm').value = lnbrMnnm;
    document.getElementById('lnbrSlno').value = lnbrSlno;
    document.getElementById('emdNo').value = emdNo;
    document.getElementById('entX').value = entX;
    document.getElementById('entY').value = entY;
}
function goPopup(){
    // 주소검색을 수행할 팝업 페이지를 호출합니다.
    // 호출된 페이지(jusopopup.jsp)에서 실제 주소검색URL(http://www.juso.go.kr/addrlink/addrCoordUrl.do)를 호출하게 됩니다.
    var pop = window.open("/seller/jusoPopup","pop","width=570,height=420, scrollbars=yes, resizable=yes");
}