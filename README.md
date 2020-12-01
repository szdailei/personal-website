client设置的apigateway地址是dailei.site，api-gateway设置的api-server地址是dailei.site。
需要在浏览器和api-gatewasy所在主机的/etc/hosts设置dailei.site的域名。

Debug，依次运行：
`
yarn build
yarn link:all
yarn dev:client or yarn dev:static or yarn dev:api or yarn dev:gateway
`
