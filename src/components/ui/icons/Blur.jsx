import * as React from "react"
const Blur = (props, width, height) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props} width={width} height={height} viewBox="">
    <path
      d="M6.429 0h1.428v4.136l.509.475h3.062V5.81H7.527l-.968-1.073-.13-.118V0Z"
    />
    <path
      fillRule="evenodd"
      d="M.143 0h4.402l.688.745h.003L5.3.82l.27.293H5.56l.011.013v1.17l-.558.531.558.631v1.161l-.003.003h.003l-1.085 1.19H.143V0Zm1.356 1.125h2.445l.269.298v.616l-.269.257H1.5V1.125Zm0 3.493h2.445l.269-.262v-.59l-.269-.309H1.5v1.161Z"
      clipRule="evenodd"
    />
    <path
      d="M0 6.704h1.429v4.136l.521.565h1.671l.522-.603V6.704H5.57v4.701l-.92 1.117H.947L0 11.405v-4.7Z"
    />
    <path
      fillRule="evenodd"
      d="M6.429 6.704v5.81h1.428v-2.282h2.471l.286.256v2.026H12v-2.282l-.592-.53.592-.63V7.912l-.017-.015h.008l-1.078-1.194H6.429Zm4.18 2.059V8.64h.005v-.473l-.286-.255H7.857v1.158h2.466l.285-.308Z"
      clipRule="evenodd"
    />
  </svg>
)
export default Blur