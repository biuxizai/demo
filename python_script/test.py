import requests
headers={
    'Host': 'tieba.baidu.com',
    'Referer': 'http://tieba.baidu.com/i/i/forum',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
                  'Chrome/71.0.3578.98 Safari/537.36',
    'cookies':
    "BIDUPSID=74A635063216A1C8B2238EEACC5B16E1"
    "PSTM=1572614111"
    "TIEBA_USERTYPE=631700b0af4c513b8700134f"
    "bdshare_firstime=1573131426353"
    "BAIDUID=902AAC4FA2F2E6238659654057014DA2:FG=1"
    "TIEBAUID=9be462d38c2c990078ecef94"
    "H_WISE_SIDS=144367_144089_141691_142018_141875_139045_141748_143162_144420_142780_144483_136863_131861_131246_137746_144741_138883_140259_141942_127969_140065_140593_143059_140351_143468_144727_143922_131423_144278_144478_144004_107312_140985_138596_139908_144112_144343_143478_142426_142911_140311_138662_144238_142115_143853_143357_143878_110085"
    "BDUSS_BFESS=JUVWt3bDdOU2VJLUFSVXNGa1piMDhrTXMwbm9ocHliY0V3U0pRVHBQUWljY1JlSVFBQUFBJCQAAAAAAAAAAAEAAACQOcgocWlueXVhbmNoaTEyMwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACLknF4i5JxeWD"
    "BDORZ=B490B5EBF6F3CD402E515D22BCDA1598"
    "rpln_guide=1"
    "Hm_lvt_287705c8d9e2073d13275b18dbd746dc=1588942288,1589078808,1589079475,1589161906"
    "BDUSS=mZlVG1zTVVlRkNCS0hVQ3N3ODRHYUxmZGhPa0R6Nlo0YWh6OFZrandMOWZNdU5lRVFBQUFBJCQAAAAAAAAAAAEAAACQOcgocWlueXVhbmNoaTEyMwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAF-lu15fpbteW"
    "STOKEN=95e8bf52dfd63dd728d67ba94e09b6662dc2d81a951844e3deeacc1429f5b69d"
    "yjs_js_security_passport=9905f79c85971fbd5c8e0160fa65d84be2cff984_1589727264_js"
    "H_PS_PSSID=1459_31326_21086_31110_31595_31271_31463_30824_26350"
    "wise_device=0"
    "st_key_id=17"
    "delPer=0"
    "PSINO=7"
    "Hm_lvt_98b9d8c2fd6608d564bf2ac2ae642948=1589624101,1589624110,1589767268,1589771940"
    "showCardBeforeSign=1"
    "Hm_lpvt_98b9d8c2fd6608d564bf2ac2ae642948=1589772217"
    "st_data=95bdfea18ab645c5b7c653bce4a12e989f9ad7fb6a6a9f9f9c7b42ed34f8c3b92486e62333aef7f557904d2856dc56394af95d2e32db543288dd46a8342639ed240f685fd219e907ed0c8efc95a4a78cfdff766ddff39641cde0b2ec4668c043010d90c20ce492174f0794cbc77d13379266ac9cc863e19dc8dc050afff1d385"
    "st_sign=6d7575de",
    'Host': 'tieba.baidu.com',
    'Referer': 'https://tieba.baidu.com/f?kw=%E8%80%81jay%E8%BF%B7',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
              'Chrome/71.0.3578.98 Safari/537.36',
}

url1="https://tieba.baidu.com"
r1=requests.get(url1,headers)

url="https://tieba.baidu.com/sign/add"
data={'ie': 'utf-8','kw': '老jay迷','tbs': '298e40f5ca5c25661589772217'}
r=requests.post(url,data=data,headers=headers)
print(r.text)
