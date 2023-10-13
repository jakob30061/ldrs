import Base from '../lib/LdrsBaseElement'
import styles from './jellyTriangle.scss'

class JellyTriangle extends Base {
  #attributes = ['size', 'color', 'speed']

  static get observedAttributes() {
    return ['size', 'color', 'speed']
  }

  constructor() {
    super()

    this.storePropsToUpgrade(this.#attributes)
    this.reflect(this.#attributes)
  }

  connectedCallback() {
    this.upgradeStoredProps()
    this.applyDefaultProps({
      size: 30,
      color: 'black',
      speed: 1.75,
    })

    this.template.innerHTML = `
      <div
        class="container"
      >
      <div class="dot"></div>
      <div class="traveler"></div>
      </div>
      <svg width="0" height="0" class="svg">
        <defs>
          <filter id="uib-jelly-triangle-ooze">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation=${this.size / 9}
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="ooze"
            />
            <feBlend in="SourceGraphic" in2="ooze" />
          </filter>
        </defs>
      </svg>
      <style>
        :host{
          --uib-size: ${this.size}px;
          --uib-color: ${this.color};
          --uib-speed: ${this.speed}s;
        }
        ${styles}
      </style>
    `

    this.shadow.replaceChildren(this.template.content.cloneNode(true))

    this.dispatchEvent(new Event('ready'))
  }

  attributeChangedCallback() {
    const styleEl = this.shadow.querySelector('style')

    if (!styleEl) return

    styleEl.innerHTML = `
      :host{
        --uib-size: ${this.size}px;
        --uib-color: ${this.color};
        --uib-speed: ${this.speed}s;
      }
      ${styles}
    `
  }
}

export default {
  register: (name = 'l-jelly-triangle') => {
    if (!customElements.get(name)) {
      customElements.define(name, class extends JellyTriangle {})
    }
  },
  element: JellyTriangle,
}
