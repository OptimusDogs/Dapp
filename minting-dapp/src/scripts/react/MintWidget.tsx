import { utils, BigNumber, ethers } from 'ethers';
import React from 'react';
import NetworkConfigInterface from '../../../../smart-contract/lib/NetworkConfigInterface';

interface Props {
  networkConfig: NetworkConfigInterface;
  maxSupply: number;
  totalSupply: number;
  tokenPrice: BigNumber;
  tokenPriceWL: BigNumber;
  tokenPriceOG: BigNumber;
  maxMintAmountPerTx: number;
  maxMintAmountPerTxOG: number;
  isPaused: boolean;
  loading: boolean;
  isWhitelistMintEnabled: boolean;
  isUserInWhitelist: boolean;
  isUserInOg: boolean;
  mintTokens(mintAmount: number): Promise<void>;
  whitelistMintTokens(mintAmount: number): Promise<void>;
  ogMintTokens(mintAmount: number): Promise<void>;
}

interface State {
  mintAmount: number;
}

const defaultState: State = {
  mintAmount: 1,
};

export default class MintWidget extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = defaultState;
  }

  private canMint(): boolean {
    return !this.props.isPaused || this.canWhitelistMint() || this.canOgMint();
  }

  private canWhitelistMint(): boolean {
    return this.props.isWhitelistMintEnabled && this.props.isUserInWhitelist;
  }

  private canOgMint(): boolean {
    return this.props.isWhitelistMintEnabled && this.props.isUserInOg;
  }


  private incrementMintAmount(): void {
    const maxMintAmountPerTx = this.props.isUserInOg ? this.props.maxMintAmountPerTxOG : this.props.maxMintAmountPerTx;
    
    this.setState({
      mintAmount: Math.min(maxMintAmountPerTx, this.state.mintAmount + 1),
    });
}


  private decrementMintAmount(): void {
    this.setState({
      mintAmount: Math.max(1, this.state.mintAmount - 1),
    });
  }

  private async mint(): Promise<void> {
    if (!this.props.isWhitelistMintEnabled) {
      await this.props.mintTokens(this.state.mintAmount);
      return;
    }

    if (this.props.isUserInOg) {
      await this.props.ogMintTokens(this.state.mintAmount);
    } else if (this.props.isUserInWhitelist) {
      await this.props.whitelistMintTokens(this.state.mintAmount);
    } else {
      // Maneggiare il caso in cui l'utente non è né in OG né nella whitelist, se necessario
      // Ad esempio, potresti visualizzare un messaggio di errore all'utente.
    }
}


  render() {
    return (
      <>
        {this.canMint() ?
          <div className={`mint-widget ${this.props.loading ? 'animate-pulse saturate-0 pointer-events-none' : ''}`}>
            <div className="preview">
              <img src="/build/images/preview.gif" alt="Collection preview" />
            </div>

            {!this.props.isWhitelistMintEnabled &&
            <div className="price">
            <strong>Public price:</strong> {utils.formatEther(this.props.tokenPrice.mul(ethers.BigNumber.from(this.state.mintAmount)))} {this.props.networkConfig.symbol}
            </div>
            }

            {this.props.isWhitelistMintEnabled && !this.props.isUserInOg &&
            <div className="WLprice">
            <strong>WL price:</strong> {utils.formatEther(this.props.tokenPriceWL.mul(ethers.BigNumber.from(this.state.mintAmount)))} {this.props.networkConfig.symbol}
            </div>
            }
            
            {this.props.isWhitelistMintEnabled && this.props.isUserInOg &&
            <div className="OGprice">
            <strong>OG price:</strong> {utils.formatEther(this.props.tokenPriceOG.mul(ethers.BigNumber.from(this.state.mintAmount)))} {this.props.networkConfig.symbol}
            </div>
            }


            <div className="controls">
              <button className="decrease" disabled={this.props.loading} onClick={() => this.decrementMintAmount()}>-</button>
              <span className="mint-amount">{this.state.mintAmount}</span>
              <button className="increase" disabled={this.props.loading} onClick={() => this.incrementMintAmount()}>+</button>
              <button className="primary" disabled={this.props.loading} onClick={() => this.mint()}>Mint</button>
            </div>
          </div>
          :
          <div className="cannot-mint">
            <span className="emoji">⏳</span>

            {this.props.isWhitelistMintEnabled ? <>You are not included in the <strong>whitelist</strong>.</> : <>The contract is <strong>paused</strong>.</>}<br />
            Please come back during the next sale!
          </div>
        }
      </>
    );
  }
}
