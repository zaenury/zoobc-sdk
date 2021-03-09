import React, { useState, useEffect } from 'react';
import zoobc, { ZooKeyring } from '../../../';

export default () => {
  const [datas, setDatas] = useState({ total: 0, liquidtransactionsList: [] });

  const data = {
    amount: 0.2,
    completeMinutes: 100,
    fee: 0.01,
    sender: { value: 'ZBC_F5YUYDXD_WFDJSAV5_K3Y72RCM_GLQP32XI_QDVXOGGD_J7CGSSSK_5VKR7YML', type: 0 },
    recipient: { value: 'ZBC_QWREWSUY_FHG66UD3_SAHOMJLW_5KTDEWZ3_FD3YP3YK_JYGTVD4B_FT7RTWUR', type: 0 },
  };

  const getLiquids = async () => {
    // const params = { senderaddress: data.sender };
    // const resLiquids = await zoobc.Liquid.getList(params);
    // console.log('==resLiquids', resLiquids);

    const res = await zoobc.Transactions.getList();
    const liquids = res.transactions.filter(x => x.transactionType === 6);
    console.log('==trx liquids', liquids);
    setDatas({ total: liquids.length, liquidtransactionsList: liquids });
  };

  const getLiquid = async id => {
    const res = await zoobc.Liquid.get(id);
    console.log('==Detail Liquid', res);
  };

  const onSubmit = async () => {
    const seed =
      'stand cheap entire summer claw subject victory supreme top divide tooth park change excite legend category motor text zebra bottom mystery off garage energy';
    const zooKeyring = new ZooKeyring(seed, '');
    const childSeed = zooKeyring.calcDerivationPath(0);

    const res = await zoobc.Liquid.sendLiquid(data, childSeed);
    console.log('==result', res);

    setTimeout(() => {
      getLiquids();
    }, 500);
  };

  const onStop = async id => {
    const seed =
      'stand cheap entire summer claw subject victory supreme top divide tooth park change excite legend category motor text zebra bottom mystery off garage energy';
    const zooKeyring = new ZooKeyring(seed, '');
    const childSeed = zooKeyring.calcDerivationPath(0);

    const liquids = datas.liquidtransactionsList.filter(f => f.id === id);
    const payload = { transactionId: liquids[0].id, accountAddress: liquids[0].sender, fee: liquids[0].fee };

    const res = await zoobc.Liquid.stopLiquid(payload, childSeed);
    console.log('==res', res);

    setTimeout(() => {
      getLiquids();
    }, 500);
  };

  useEffect(() => {
    function init() {
      const groups = [
        {
          label: 'Beta',
          // wkps: ['http://172.104.62.181:7001', 'http://45.79.35.137:7001', 'http://23.92.27.48:7001'],
          // wkps: [
          //   'http://n0.alpha.proofofparticipation.network:7001',
          //   'http://n1.alpha.proofofparticipation.network:7001',
          //   'http://n2.alpha.proofofparticipation.network:7001',
          //   'http://n3.alpha.proofofparticipation.network:7001',
          //   'http://n4.alpha.proofofparticipation.network:7001',
          //   'http://n5.alpha.proofofparticipation.network:7001',
          // ],
          wkps: [
            'http://n0.beta.proofofparticipation.network:7001',
            'http://n1.beta.proofofparticipation.network:7001',
            'http://n2.beta.proofofparticipation.network:7001',
            'http://n3.beta.proofofparticipation.network:7001',
            'http://n4.beta.proofofparticipation.network:7001',
          ],
        },
      ];
      zoobc.Network.load(groups);
      // getLiquids();
    }
    init();
  }, []);

  return (
    <>
      <h2>liquid transaction</h2>
      <button onClick={onSubmit}>Create Liquid</button>
      <button onClick={getLiquids}>List Transaction Liquid</button>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Sender</th>
            <th>Recipient</th>
            <th>Fee</th>
            <th>Message</th>
            <th>Amout</th>
            <th>Complete Minutes</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {datas &&
            datas.liquidtransactionsList &&
            datas.liquidtransactionsList.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td onClick={() => getLiquid(item.id)}>{item.id}</td>
                  <td>{item.sender.value}</td>
                  <td>{item.recipient.value}</td>
                  <td>{item.fee}</td>
                  <td>{item.message}</td>
                  <td>{item.amount || item.txBody.amount}</td>
                  <td>{item.completeMinutes || item.txBody.completeminutes}</td>
                  <td>{item.status || item.transactionTypeString}</td>
                  <td>
                    <button onClick={() => onStop(item.id)}>stop liquid tx</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};
