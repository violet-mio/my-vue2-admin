<template>
  <footer>
    <!-- 底部 -->
    <slot name="footer">
      <div class="legal">
        <ul class="links">
          <li class="copyright">
            <span class="copyright-text">© 2021 - 2050 obbo 版权所有 粤ICP备000xxxx号</span>
          </li>
          <li><a class="link" href="#" data-analytics-title="privacy policy">隐私政策</a></li>
          <li><a class="link" href="#" data-analytics-title="terms of use">使用条款</a></li>
          <li><a class="link" href="#" data-analytics-title="legal">法律信息</a></li>
          <li><a class="link" href="/sitemap" data-analytics-title="site map">网站地图</a></li>
        </ul>
      </div>
    </slot>
  </footer>
</template>
<script>
export default {
  name: 'PageFooter'
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';

$containerWidth: 1200px;
footer {
  width: $containerWidth;
  margin: 20px auto 0;

  .legal {
    position: relative;
    padding: 26px 0;

    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0px;
      right: 0px;
      height: 1px;
      background-color: rgba(0,0,0,0.08);
    }

    ul,
    li {
      padding: 0;
      margin: 0;
      list-style: none;
    }

    .links {
      display: flex;
      align-items: center;

      li {
        display: inline-block;
        vertical-align: baseline;
        margin-right: 20px;

        .link,
        .copyright-text {
          font-size: 14px;
          font-weight: 500;
          color: #7f7f7f;
          line-height: 24px;
        }
        .link:hover {
          color: #000
        }
      }
    }
  }
}
</style>
