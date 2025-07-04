FROM node:24

LABEL maintainer="nagidec.24a@gmail.com"

# # nodeがデフォルトで用意しているユーザの情報
ARG USERNAME=node
# ARG USER_UID=1000
# ARG USER_GID=$USER_UID

# 作業ディレクトリ
ARG WORKSPACE=/workspace

# 言語設定
ENV LANG=ja_JP.UTF-8

# 作業ディレクトリを変更
WORKDIR $WORKSPACE

# 必要なツールをインストール
RUN apt update && apt -y upgrade \
    && apt install -y --no-install-recommends \
    curl \
    git \
    zip \
    unzip \
    build-essential \
    net-tools \
    procps \
    iputils-ping

    # sudo \
    # # ユーザのsudo使用を許可
    # && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    # && chmod 0440 /etc/sudoers.d/$USERNAME

# ユーザを変更
USER $USERNAME
