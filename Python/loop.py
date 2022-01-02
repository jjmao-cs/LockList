import gspread
import threading
from oauth2client.service_account import ServiceAccountCredentials
from netmiko import ConnectHandler
import numpy as np
import time

cisco1 = {
    'host': '{IP}',
    'username': 'snmg',
    'password': '{PASSWORD}',
    'device_type': 'cisco_ios',
    'secret': '{SWITCH_SECRET}'}
cisco2 = {
    'host': '{IP}',
    'username': 'snmg',
    'password': '{PASSWORD}',
    'device_type': 'cisco_ios',
    'secret': '{SWITCH_SECRET}'}
cisco3 = {
    'host': '{IP}',
    'username': 'snmg',
    'password': '{PASSWORD}',
    'device_type': 'cisco_ios',
    'secret': '{SWITCH_SECRET}'}
cisco4 = {
    'host': '{IP}',
    'password': '{PASSWORD}',
    'device_type': 'cisco_ios_telnet',
    'secret': '{SWITCH_SECRET}'}
hp_426 = {
    'host': '{IP}',
    'username': 'snmg',
    'password': '{PASSWORD}',
    'device_type': 'hp_comware'}
hp_5f = {
    'host': '{IP}',
    'username': 'snmg',
    'password': '{PASSWORD}',
    'device_type': 'hp_comware'}
link_cisco=(cisco1,cisco2,cisco3,cisco4)
link_hp=(hp_426,hp_5f)


'''for i in ip.get_all_values():
    print(i)'''


def connect_cisco(ip, stat, choice):
    lockip = ('ip access-list standard 10', 'no permit any',
              'deny host '+ip, 'permit any')

    unlockip = ('ip access-list standard 10', 'no deny host '+ip)
    cmd_dict = {'TRUE': lockip, 'FALSE': unlockip}
    net_connect = ConnectHandler(**link_cisco[choice])
    net_connect.enable()
    net_connect.send_config_set(cmd_dict[stat])
    net_connect.send_command_expect('write memory')
    net_connect.disconnect()


def connect_hp(ip, stat, choice):
    net_connect = ConnectHandler(**link_hp[choice])
    if stat == 'TRUE':  # lock
        cmd = ('acl number 2000', 'rule deny source '+ip+' 0 logging')
    else:  # unlock
        acl_list = net_connect.send_config_set(('display acl 2000'))
        acl_list = acl_list.split('\n')
        for i in acl_list[5:-3]:  # 前4行和後3行沒用
            if len(i.split()) < 5:  # 濾掉permit any
                continue
            elif i.split()[4] == ip:  # 取出IP來比對
                undo_deny_id = i.split()[1]
        cmd = ('acl number 2000', 'undo rule '+undo_deny_id)
    # net_connect.enable()
    # net_connect.enable()
    net_connect.send_config_set(cmd)
    net_connect.save_config()
    #net_connect.send_command_expect('write memory')
    net_connect.disconnect()


def gSheet_checking(gc, i):
    sheet = gc.get_worksheet(i)
    c = sheet.col_values(3)
    c = np.array(c)
    idx = np.arange(len(c))
    index = idx[c == 'TRUE']
    # print(index)
    for j in index:
        ip = sheet.cell(j+1, 1)
        stat = sheet.cell(j+1, 2)
        # print(ip.value,stat.value)

        threads = []
        for h in range(len(link_cisco)):
            t = threading.Thread(target=connect_cisco,
                                 args=(ip.value, stat.value, h))
            t.start()
            threads.append(t)
        for h in range(len(link_hp)):
            t = threading.Thread(
                target=connect_hp, args=(ip.value, stat.value, h))
            t.start()
            threads.append(t)
        for t in threads:
            t.join()
        sheet.update_cell(j+1, 3, 'FALSE')


if __name__ == "__main__":
    tStart = time.time()
    cred = "/home/{USER}/client.json"
    gss_scopes = 'https://spreadsheets.google.com/feeds'
    credentials = ServiceAccountCredentials.from_json_keyfile_name(
        cred, gss_scopes)
    gss_client = gspread.authorize(credentials)
    gc = gss_client.open_by_key("{SPREADSHEET_ID}")

    process = []
    for i in range(1, 10):
        p = threading.Thread(target=gSheet_checking, args=(gc, i))
        p.start()
        process.append(p)
    for p in process:
        p.join()
    print('Time spend: {} sec\n'.format(time.time() - tStart))
