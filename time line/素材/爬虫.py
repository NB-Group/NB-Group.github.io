import requests
import time
ind = 0
def download_image(url, save_path):
    global ind
    response = requests.get(url)
    if response.status_code == 200:
        with open(save_path+str(ind)+".png", 'wb') as file:
            file.write(response.content)
        print("图片下载成功！")
        ind += 1
    else:
        print("图片下载失败！")

urls = ["https://image.baidu.com/search/acjson?tn=resultjson_com&logid=11828702773241402689&ipn=rj&ct=201326592&is=&fp=result&fr=ala&word=%E4%B8%8A%E6%B5%B7%E7%85%A7%E7%89%87&queryWord=%E4%B8%8A%E6%B5%B7%E7%85%A7%E7%89%87&cl=2&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=&z=&ic=&hd=&latest=&copyright=&s=&se=&tab=&width=&height=&face=&istype=&qc=&nc=&expermode=&nojc=&isAsync=&pn=30&rn=30&gsm=1e&1697806383135=","https://image.baidu.com/search/acjson?tn=resultjson_com&logid=11828702773241402689&ipn=rj&ct=201326592&is=&fp=result&fr=ala&word=%E4%B8%8A%E6%B5%B7%E7%85%A7%E7%89%87&queryWord=%E4%B8%8A%E6%B5%B7%E7%85%A7%E7%89%87&cl=2&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=&z=&ic=&hd=&latest=&copyright=&s=&se=&tab=&width=&height=&face=&istype=&qc=&nc=&expermode=&nojc=&isAsync=&pn=60&rn=30&gsm=3c&1697806383710=","https://image.baidu.com/search/acjson?tn=resultjson_com&logid=11828702773241402689&ipn=rj&ct=201326592&is=&fp=result&fr=ala&word=%E4%B8%8A%E6%B5%B7%E7%85%A7%E7%89%87&queryWord=%E4%B8%8A%E6%B5%B7%E7%85%A7%E7%89%87&cl=2&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=&z=&ic=&hd=&latest=&copyright=&s=&se=&tab=&width=&height=&face=&istype=&qc=&nc=&expermode=&nojc=&isAsync=&pn=90&rn=30&gsm=5a&1697806458856="]
for url in urls:

    headers = {
        "Accept": "text/plain, */*; q=0.01",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "Connection": "keep-alive",
        "Host": "image.baidu.com",
        "Referer": "https://image.baidu.com/search/index?tn=baiduimage&ct=201326592&lm=-1&cl=2&ie=gb18030&word=%C9%CF%BA%A3%D5%D5%C6%AC&fr=ala&ala=1&alatpl=normal&pos=0&dyTabStr=MTEsMCwzLDIsNCwxLDYsNSw3LDgsOQ%3D%3D",
        "Sec-Ch-Ua": "\"Microsoft Edge\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": "\"Windows\"",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.60",
        "X-Requested-With": "XMLHttpRequest"
    }

    response = requests.post(url, headers=headers)
    res = response.json()
    for i in res["data"]:
        try:
            print(i["middleURL"],end="")
            download_image(i["middleURL"],".\\现代\\")
        except:
            pass
        time.sleep(0.1)
    time.sleep(10)
