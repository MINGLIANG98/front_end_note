

import { request } from '@umijs/max';
import { Image, ImageProps } from 'antd';
import { FC, useEffect, useRef, useState } from 'react';

type WImageProps = ImageProps & {
  src?: string;
};
// http://192.168.1.35:8080/job/basf/job/basifu_frontend/configure
// 图片懒加载原理
// 在浏览器中，展示一张图片，我们使用的是 img 标签。img 标签有一个必须传入的属性 src，
// 当我们不传入 src 时，图片无法加载，一旦传入 src，那么图片就会立即开始加载
// 因此，我们需要做的事情就是，当图片没有出现在可视区域时，不传入正确的 src 属性，
// 当通过上述的方法判断图片已经出现在可视区域，我们就传入正确的 src，此时图片会立即加载
const WImage: FC<WImageProps> = (props) => {
  const { src, ...rest } = props;
  const [img, setImg] = useState<string>();
  const imgRef = useRef<any>();
  const idRef = useRef(Math.random().toString())
  useEffect(() => {
    const lazyLoadImage = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !imgRef.current) {
          getImageSource();
        }
      });
    };

    const options = {
      root: null,
      // 自定义目标元素的根节点。该节点必须是目标元素的祖先元素。 如果未指定，默认为视口。 
      rootMargin: '0px',
      // 根元素周围的边距。其值可以类似于 CSS 的 margin 属性，例如 10px 20px 30px 40px，
      threshold: 0.1,
      // 一个数字或者一组数字。表示目标可见度达到多少百分比时，回调函数就应该执行。
      // 例如，如果我希望交叉部分每超过目标元素 25% 就执行，那么我就传入 [0, 0.25, 0.5, 0.75, 1]. 默认值为 0
    };

    const observer = new IntersectionObserver(lazyLoadImage, options);
    // disconnect(): void;  停止监听
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/IntersectionObserver/observe) */
    // observe(target: Element): void; 开始监听目标元素
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/IntersectionObserver/takeRecords) */
    // takeRecords(): IntersectionObserverEntry[]; 返回所有目标元素的信息对象数组
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/IntersectionObserver/unobserve) */
    // unobserve(target: Element): void;  停止监听目标元素

    // console.log(img);
    const imgDom = document.getElementById(idRef.current)

    if (imgDom) {
      // 添加监听器
      observer.observe(imgDom);
    }

    return () => {
      if (imgDom) {
        observer.unobserve(imgDom);
        observer.disconnect()
      }
    };
  }, [src]);

  /**
   * @description: 查询图片源
   */
  const getImageSource = () => {
    if (src) {
      request(src, {
        method: 'GET',
        responseType: 'blob',
      }).then(async (res) => {
        const base64 = await getBase64(res);
        setImg(base64 as string);
        // 保存一份 方便闭包访问
        imgRef.current=base64
      });
    }
  };

  // 二进制流转换为base64 格式。
  const getBase64 = (data: any) => {
    return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      const blob = new Blob([data], { type: 'image/jpeg/png' }); //类型一定要写！！！
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return <Image id={idRef.current} {...rest} src={img} />;
};

export default WImage;
