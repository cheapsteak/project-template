#!/bin/sh
echo "connecting to server..."
sftpPassword="VVirt123"
cd build
sshpass -p $sftpPassword sftp virtualtour@successacademies.org << EOF
  cd virtualtour-path/middleschool
  put -r .
  quit
EOF
