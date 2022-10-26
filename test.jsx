/*
 * @Author: QIANMINGLIANG
 * @Date: 2022-10-21 14:51:48
 * @Description: 请填写简介
 * @memo:
 */

{
  /* <div>
    {Object.keys(record)}
</div> */
}

{
  /* <div>
    {record.inQuantity}
</div> */
}

<div>
  {(record.lailiaoAttach ?? []).map((file) => (
    <a href={file.url} download={file.name}>
      {file.name}
    </a>
  ))}
</div>;
<div>
  {(text ?? []).map((file) => (
    <a href={file.url} download={file.name}>
      {file.name}
    </a>
  ))}
</div>;

[{"validator":"console.log('***',record,value,formData);","message":"质检数量不能大于报检数量"}]


[{"disabled": true}]

[{"validator":"value<=(formData.customizedData.baoJianNumber??0)-(record.regular??0)","message":"不合格品数量超出"}]