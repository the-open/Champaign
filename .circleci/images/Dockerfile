FROM circleci/ruby:2.4.1-node

RUN sudo apt-get install python -qq
RUN sudo apt-get install -y python-pip libpython-dev
RUN pip install awsebcli --upgrade --user
ENV PATH "$PATH:~/.local/bin"
